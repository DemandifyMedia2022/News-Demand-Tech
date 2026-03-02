import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const subscribeSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(254),
});

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isOriginAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (process.env.NODE_ENV !== "production") return true;
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  return allowed.length === 0 || Boolean(origin && allowed.includes(origin));
}

export async function POST(req: NextRequest) {
  try {
    // Origin check
    if (!isOriginAllowed(req)) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // Content-Type check
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { message: "Invalid content type" },
        { status: 415 }
      );
    }

    // Rate limiting
    const ip = getClientIp(req);
    const now = Date.now();
    const existing = rateLimitStore.get(ip);
    if (!existing || existing.resetAt <= now) {
      rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else {
      existing.count += 1;
      if (existing.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { message: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    // Payload size limit
    const bodyText = await req.text();
    if (bodyText.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { message: "Payload too large" },
        { status: 413 }
      );
    }

    const body: unknown = JSON.parse(bodyText);
    const parsed = subscribeSchema.parse(body);
    const { email } = parsed;

    // Save to database
    const result = await pool.query(
      "INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING id",
      [email]
    );

    // Only send emails if new subscriber (not duplicate)
    if (result.rows.length > 0) {
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const notifyEmails = process.env.CONTACT_NOTIFICATION_EMAILS?.trim();

      if (smtpHost && smtpPort && smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: false,
          auth: { user: smtpUser, pass: smtpPass },
        });

        // Admin notification
        if (notifyEmails) {
          await transporter.sendMail({
            from: `"Demandify Media" <${smtpUser}>`,
            to: notifyEmails,
            subject: "New Newsletter Subscriber 🎉",
            html: `
              <h3>New Subscriber Alert</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p>A new user has subscribed to the newsletter.</p>
            `,
          });
        }

        // Thank you email
        await transporter.sendMail({
          from: `"Demandify Media" <${smtpUser}>`,
          to: email,
          subject: "Thank You for Subscribing 💙",
          html: `
            <h2>Welcome to Demandify Media!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You will now receive updates whenever a new blog is published.</p>
            <br/>
            <p>Stay tuned 🚀</p>
          `,
        });
      }
    }

    return NextResponse.json({
      message: "Subscribed Successfully 🎉",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Subscribe error:", message);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
