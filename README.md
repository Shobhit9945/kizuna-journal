# Kizuna Journal

A bilingual journaling experience for students with AI-powered reflection. The app now uses a MongoDB-backed API for auth and journaling data, plus Z.AI for conversation and insights.

## Tech stack
- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui components
- MongoDB-backed API layer (configurable via environment)
- Z.AI for AI-assisted journaling conversations

## Getting started
1. Install dependencies
   ```sh
   npm install
   ```
2. Configure environment
   ```sh
   # .env.local
   VITE_MONGODB_API_URL=https://your-api.example.com
   VITE_ZAI_API_URL=https://zai.example.com/v1/chat
   VITE_ZAI_API_KEY=your-zai-api-key
   ```
3. Run the dev server
   ```sh
   npm run dev
   ```

## Production build
```sh
npm run build
```

## Notes
- AI responses will fall back to a placeholder when `VITE_ZAI_API_KEY`/`VITE_ZAI_API_URL` are missing.
- Authentication, session handling, and journals require the MongoDB API; ensure `VITE_MONGODB_API_URL` is configured for Netlify deployments.
