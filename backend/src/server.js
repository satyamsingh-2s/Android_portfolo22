import app from "./app.js";
import { env } from "./config/env.js";
// import { verifySmtp } from "./mail/smtp.js";

const server = app.listen(env.port, async () => {
  // try {
  //   await verifySmtp();
  //   console.log("SMTP connection verified.");
  // } catch (error) {
  //   console.error("SMTP verification failed:", error.message);
  // }
  
  console.log(`Sawad API running on http://localhost:${env.port}`);
});

function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);

  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
