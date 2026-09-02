# Bayfields Audiology Report

A standalone React and Vite hearing assessment report for Bayfields Opticians & Audiologists.

## Privacy fields

- Client Name is not collected or displayed.
- Client ID is an optional field.
- A report can be generated without a Client ID.
- The PDF preview shows Client ID only when one is entered.

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Available commands

```bash
npm run typecheck
npm run build
npm run preview
```

The production build is written to `dist/`.

## Included standalone report

A no-install version is available at `public/hearing-assessment-report.html`. It can be opened directly in a browser or hosted as a static HTML file.
