import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.resend.apiKey);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendContactEmail({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  const { data, error } = await resend.emails.send({
    from: env.mail.from,
    to: [env.mail.to],
    replyTo: email,
    subject: `${env.mail.siteName} — New contact from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `
  });

  if (error) {
    const err = new Error(error.message || "Resend failed to send the email.");
    err.status = error.statusCode || 502;
    throw err;
  }

  return data;
}
