# BONGBONGEE HIPPERS Tracker

Group order tracker for SEVENTEEN BONGBONGEE Japan Original Merch HIPPERS.

## Theme
Rose Quartz & Serenity (SEVENTEEN fan club colors).

## Stack
- Vite + React + TypeScript
- Convex (backend + DB)
- Deploy to Vercel

## Setup
1. `npm install`
2. `npx convex dev` (creates project, generates `_generated`)
3. `npm run dev`
4. Deploy: connect repo to Vercel, set build command `npx convex deploy --cmd 'npm run build'`

## Data
HIPPERS BONGBONGEE is random 8 out of 12 (6 normal + 2 secret). Track each individual unit's lifecycle: available → interested → sold.

## Deploy
Push to GitHub, import in Vercel, add `CONVEX_DEPLOY_KEY` env var.
