# LearnLens Backend

Backend for LearnLens — accepts PDF uploads, extracts text with pdfjs-dist, and returns AI summary + study questions/suggestions via Google Gemini.

## Hosting

- **Live:** [https://learnlens-be.vercel.app](https://learnlens-be.vercel.app) (Vercel serverless)
- **Local:** `node server.js` → `http://localhost:8000`

## What it does

- **GET /** — Health check (“LearnLens Backend Running”).
- **POST /upload** — Accepts a PDF (field `pdf`), extracts text, sends it to Gemini, returns `{ message, aiOutput }` (markdown with summary, 5 questions, 3 study suggestions).

## Run locally

```bash
npm install
npm start
```

Add a `.env` with `GEMINI_API_KEY` (your Google AI key). On Vercel, set the same env var in the project settings.
