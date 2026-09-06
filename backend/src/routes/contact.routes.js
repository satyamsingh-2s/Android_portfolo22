import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submitContact } from "../controllers/contact.controller.js";
import { contactValidation } from "../validators/contact.validator.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact attempts. Please try again later."
  }
});

router.post("/", contactLimiter, contactValidation, submitContact);

export default router;
