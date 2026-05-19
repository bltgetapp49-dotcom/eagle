<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Fdx Logistics

This repository runs the Fdx logistics tracking and admin portal locally.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set environment variables in `.env` or your shell:
   - `ADMIN_PASSWORD` (defaults to `admin123`)
   - `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS`
3. Run the app locally:
   `npm run dev`

## Serverless Deployment

This project now uses Vercel serverless functions for backend API routes and Firestore for data storage.

- The frontend is built with Vite and served as a static app.
- The backend routes live under `api/` and connect to Firestore via `firebase-admin`.
- Host on Vercel free tier and use Firestore Spark tier for no-cost deployment.

### Deploy to Vercel

1. Create a Vercel account and install the Vercel CLI if needed.
2. Set environment variables in Vercel:
   - `ADMIN_PASSWORD`
   - `FIREBASE_SERVICE_ACCOUNT_JSON`
3. Deploy from the project root:
   `vercel --prod`
# eagle
