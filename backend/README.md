# Sawad Portfolio Backend

Node.js/Express API for the portfolio contact form.

## Features

- Resend Email API for contact-form delivery
- `express-validator` input validation
- Strict allowlist for browser `Origin`
- Helmet security headers
- Rate limiting on the contact endpoint
- JSON-only contact endpoint with a small body limit
- Honeypot field for simple bot filtering
- Environment variables for secrets
- Modular folder structure
- Render-friendly startup with no SMTP connection required

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
    │   └── resend.js
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

## Resend setup

Create a Resend API key and put it in `RESEND_API_KEY`.

For production, verify the domain you want to send from in Resend and set `MAIL_FROM` to an address on that verified domain.

Never put `RESEND_API_KEY` in the React/Vite frontend.

## Render

Use:

- Build Command: `npm install`
- Start Command: `npm start`

Set these Render environment variables:

```env
NODE_ENV=production
ALLOWED_ORIGINS=https://your-portfolio-domain.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
MAIL_TO=your-email@example.com
MAIL_FROM=Portfolio <hello@yourdomain.com>
SITE_NAME=Your Portfolio
```

Render provides `PORT` automatically, so you normally do not need to set it manually.

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
