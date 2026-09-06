import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
  ...(env.smtp.port === undefined ? {} : { port: env.smtp.port }),
  ...(env.smtp.secure === undefined ? {} : { secure: env.smtp.secure }),
});

// export async function verifySmtp() {
//   await transporter.verify();
// }

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

  return transporter.sendMail({
    from: env.mail.from,
    to: env.mail.to,
    replyTo: email,
    subject: `${env.mail.siteName} — New contact from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `,
  });
}
