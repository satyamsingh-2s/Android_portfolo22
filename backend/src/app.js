import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { originGuard } from "./middleware/origin.middleware.js";
import { notFound } from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import contactRoutes from "./routes/contact.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(helmet());

// Enforce the origin allowlist before any API route is handled.
// This makes unknown/missing browser origins receive 403 instead of
// relying only on CORS response headers.
app.use(originGuard);

app.use(
  cors({
    origin(origin, callback) {
      callback(null, Boolean(origin && env.allowedOrigins.includes(origin)));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  }),
);

// Keep the accepted request body deliberately small.
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Sawad Portfolio API",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
