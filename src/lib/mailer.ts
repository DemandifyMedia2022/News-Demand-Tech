import nodemailer from "nodemailer";

const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER;
const smtpPassHash = process.env.SMTP_PASS_HASH;

let cachedTransporter: nodemailer.Transporter | null = null;

async function getTransporter(): Promise<nodemailer.Transporter | null> {
  if (cachedTransporter) return cachedTransporter;
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPassHash) return null;

  // In production, fetch plaintext from a secure vault; here we fallback to env var
  const pass = process.env.SMTP_PASS || "";
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    requireTLS: !smtpSecure,
    auth: {
      user: smtpUser,
      pass,
    },
  });

  cachedTransporter = transporter;
  return transporter;
}

export { getTransporter };
