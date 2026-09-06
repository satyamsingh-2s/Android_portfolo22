import app from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.port, "0.0.0.0", () => {
  console.log(`API running on port ${env.port}`);
});

function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);

  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
