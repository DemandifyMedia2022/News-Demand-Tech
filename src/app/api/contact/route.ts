import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getTransporter } from "@/lib/mailer";
import { z, ZodError } from "zod";

const MAX_BODY_BYTES = 25_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isOriginAllowed(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  if (allowed.length === 0) {
    return true; // do not block if not configured
  }

  if (!origin) {
    return false;
  }

  return allowed.includes(origin);
}
const blockedEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "zoho.com",
  "rediffmail.com"
];


const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return domain && !blockedEmailDomains.includes(domain);
    }, {
      message: "Please use your company email address (no Gmail/Yahoo/etc.)"
    }),

  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(200).optional(),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please agree to receive communications"),
});

export async function POST(req: NextRequest) {
  try {
    if (!isOriginAllowed(req)) {
      return NextResponse.json(
        {
          success: false,
          type: "forbidden",
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          type: "bad_request",
          message: "Invalid content type",
        },
        { status: 415 }
      );
    }

    const bodyText = await req.text();
    if (bodyText.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          type: "bad_request",
          message: "Payload too large",
        },
        { status: 413 }
      );
    }

    const body = JSON.parse(bodyText);
    const parsed = contactSchema.parse(body);

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      null;

    const userAgent = req.headers.get("user-agent");

    const rateKey = (ip || "unknown").split(",")[0].trim();
    const now = Date.now();
    const existing = rateLimitStore.get(rateKey);
    if (!existing || existing.resetAt <= now) {
      rateLimitStore.set(rateKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else {
      existing.count += 1;
      if (existing.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          {
            success: false,
            type: "rate_limited",
            message: "Too many requests. Please try again later.",
          },
          { status: 429 }
        );
      }
    }

    // ✅ Save to database
    await pool.query(
      `INSERT INTO contact_messages
      (first_name, last_name, email, phone, company, message, consent, ip_address, user_agent)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        parsed.firstName,
        parsed.lastName,
        parsed.email,
        parsed.phone || null,
        parsed.company || null,
        parsed.message,
        parsed.consent,
        ip,
        userAgent,
      ]
    );

    // ✅ Read notification emails from .env
    const notificationEmails =
      process.env.CONTACT_NOTIFICATION_EMAILS?.split(",").map((e) =>
        e.trim()
      ) || [];

    let emailDelivered = true;
    try {
      const safeFirstName = escapeHtml(parsed.firstName);
      const safeLastName = escapeHtml(parsed.lastName);
      const safeEmail = escapeHtml(parsed.email);
      const safePhone = escapeHtml(parsed.phone || "N/A");
      const safeCompany = escapeHtml(parsed.company || "N/A");
      const safeMessage = escapeHtml(parsed.message).replaceAll("\n", "<br/>");

      // ✅ Send notification email to team
      const transporter = await getTransporter();
      if (transporter && notificationEmails.length > 0) {
        await transporter.sendMail({
          from: `"Demandify Media" <${process.env.SMTP_USER}>`,
          to: notificationEmails,
          subject: "New Contact Form Submission",
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Company:</strong> ${safeCompany}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
        });
      }

      // ✅ Send confirmation email to user
      if (transporter) {
        await transporter.sendMail({
          from: `"Demandify Media" <${process.env.SMTP_USER}>`,
          to: parsed.email,
          subject: "Thank you for contacting News Demand-Tech",
          html: `
            <h2>Thank You ${safeFirstName}!</h2>
            <p>We have received your message and our team will get in touch with you within 24 hours.</p>
            <p><strong>Your Message:</strong></p>
            <p>${safeMessage}</p>
            <br/>
            <p>Best Regards,<br/>News Demand-Tech Team</p>
          `,
        });
      }
    } catch (mailError) {
      emailDelivered = false;
      console.error("Contact form email send failed:", mailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message saved successfully",
        emailDelivered,
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error(error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          type: "bad_request",
          message: "Invalid JSON",
        },
        { status: 400 }
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          type: "validation",
          errors: error.issues.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        type: "server",
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
