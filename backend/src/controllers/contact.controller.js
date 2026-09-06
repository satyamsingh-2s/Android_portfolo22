import { sendContactEmail } from "../mail/smtp.js";

export async function submitContact(req, res, next) {
  try {
    // Validation guarantees these fields have already been checked.
    const { name, email, message } = req.body;

    await sendContactEmail({
      name,
      email,
      message
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent."
    });
  } catch (error) {
    next(error);
  }
}
