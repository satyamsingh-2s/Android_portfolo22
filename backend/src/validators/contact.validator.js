import { body, validationResult } from "express-validator";

export const contactValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be between 2 and 80 characters.")
    .matches(/^[\p{L}\p{M} .,'-]+$/u)
    .withMessage("Name contains invalid characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage("Email is too long."),

  body("message")
    .trim()
    .isLength({ min: 10, max: 3000 })
    .withMessage("Message must be between 10 and 3000 characters."),

  body("website")
    .optional({ values: "falsy" })
    .trim()
    .isEmpty()
    .withMessage("Spam detected."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Please check the submitted fields.",
        errors: errors.array().map(({ path, msg }) => ({
          field: path,
          message: msg
        }))
      });
    }

    next();
  }
];
