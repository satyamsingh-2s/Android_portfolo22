import "dotenv/config";

const required = [
  "RESEND_API_KEY",
  "MAIL_TO",
  "MAIL_FROM"
];

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
  resend: {
    apiKey: process.env.RESEND_API_KEY
  },
  mail: {
    to: process.env.MAIL_TO,
    from: process.env.MAIL_FROM,
    siteName: process.env.SITE_NAME || "Sawad Portfolio"
  }
};
