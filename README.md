# Kizuna Journal

A bilingual journaling experience for students with AI-powered reflection. The app now uses a MongoDB-backed API for auth and journaling data, plus Z.AI for conversation and insights.

## Tech stack
- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui components
- MongoDB-backed API layer (connection URI is embedded in the code)
- Z.AI for AI-assisted journaling conversations (API URL and key embedded in the code)

## Getting started
1. Install dependencies
   ```sh
   npm install
   ```
2. Run the dev server
   ```sh
   npm run dev
   ```

## Production build
```sh
npm run build
```

## Notes
- The MongoDB connection string and Z.AI API credentials are hardcoded in the client for convenience.
- Update `src/lib/mongoService.ts`, `src/lib/journalService.ts`, and `src/lib/zaiClient.ts` if you want to change them.
