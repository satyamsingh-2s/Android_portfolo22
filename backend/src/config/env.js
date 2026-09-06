import "dotenv/config";

const required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "MAIL_TO", "MAIL_FROM"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  allowedOrigins: parseOrigins(process.env.ALLOWED_ORIGINS),
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    secure:
      process.env.SMTP_SECURE === undefined
        ? undefined
        : String(process.env.SMTP_SECURE).toLowerCase() === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  mail: {
    to: process.env.MAIL_TO,
    from: process.env.MAIL_FROM,
    siteName: process.env.SITE_NAME || "Portfolio",
  },
};
