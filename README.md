# Bayfields Audiology Report

A client-side React app for creating polished Bayfields hearing assessment reports. It includes manufacturer summaries for Starkey, Oticon Reveal, Widex, Rexton and Signia maX, plus a printable PDF-style report preview and downloadable standalone HTML report.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build for hosting

```bash
npm run build
npm run preview
```

The production files are created in `dist/`. This app is client-side only and does not require a database or backend service.

## GitHub Pages, Netlify or Vercel

Upload the contents of this folder to a repository and connect it to your preferred static hosting provider. The Vite configuration uses relative asset paths so the production build can also be served from a repository subpath.
