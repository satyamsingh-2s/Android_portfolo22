# Sawad Portfolio Backend

Node.js/Express API for the portfolio contact form.

## Features

- SMTP email delivery with Nodemailer
- `express-validator` input validation
- Strict allowlist for browser `Origin`
- Helmet security headers
- Rate limiting on the contact endpoint
- JSON-only contact endpoint with a small body limit
- Honeypot field for simple bot filtering
- Environment variables for secrets
- Modular folder structure

## Folder structure

```text
sawad-backend/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   └── env.js
    ├── controllers/
    │   └── contact.controller.js
    ├── mail/
    │   └── smtp.js
    ├── middleware/
    │   ├── error.middleware.js
    │   ├── not-found.middleware.js
    │   └── origin.middleware.js
    ├── routes/
    │   ├── contact.routes.js
    │   └── health.routes.js
    └── validators/
        └── contact.validator.js
```

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

## SMTP

For Gmail, enable 2-Step Verification and create an **App Password**. Put that App Password in `SMTP_PASS`.

Do not put SMTP credentials in the React/Vite frontend.

## Contact API

```text
POST http://localhost:5000/api/contact
Content-Type: application/json
Origin: http://localhost:5173
```

Body:

```json
{
  "name": "Ritik",
  "email": "visitor@example.com",
  "message": "I would like to discuss a project.",
  "website": ""
}
```

`website` is a hidden honeypot field. A normal visitor should leave it empty.

Successful response:

```json
{
  "success": true,
  "message": "Your message has been sent."
}
```

## Frontend

Set:

```env
VITE_API_URL=http://localhost:5000
```

Then submit JSON to:

```text
${import.meta.env.VITE_API_URL}/api/contact
```

Example:

```js
await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    message,
    website: ""
  })
});
```

## Production checklist

1. Set `NODE_ENV=production`.
2. Set `ALLOWED_ORIGINS` to the exact deployed frontend origin(s), e.g. `https://example.com` — no trailing slash.
3. Use a real SMTP provider and keep credentials in server-side environment variables.
4. Put the API behind HTTPS.
5. Keep the contact rate limit enabled.
6. Add centralized logging/monitoring.
7. If deployed behind a reverse proxy, configure Express `trust proxy` correctly before relying on IP-based rate limiting.
8. Do not add `*` to CORS.
9. Do not expose SMTP credentials or other secrets to Vite variables.
