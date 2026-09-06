import { env } from "../config/env.js";

export function originGuard(req, res, next) {
  const origin = req.headers.origin;

  // This API is intended to be called by the portfolio frontend.
  // Reject browser requests without an Origin as well as unknown Origins.
  if (!origin || !env.allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Origin is not allowed."
    });
  }

  next();
}
