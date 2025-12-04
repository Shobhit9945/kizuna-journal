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

## Deploying to Netlify
1. In the Netlify dashboard, open **Site settings → Environment variables** and add:
   - `VITE_MONGODB_API_URL` set to your deployed HTTPS API (e.g., `https://api.yourdomain.com`). Do **not** use a `mongodb+srv://` URI—the browser cannot fetch those directly and it exposes credentials.
   - `VITE_ZAI_API_KEY` (and `VITE_ZAI_API_URL` if you are overriding the default AI endpoint).
2. Trigger a new deploy (or enable **Builds → Build hooks** if you want to redeploy automatically on Git pushes).
3. After deployment, use the live site’s signup/login forms to verify the auth API responds over HTTPS; errors like “Request cannot be constructed from a URL that includes credentials” indicate the variable is still pointing at a `mongodb+srv://` URI.

## Notes
- AI responses will fall back to a placeholder when `VITE_ZAI_API_KEY`/`VITE_ZAI_API_URL` are missing.
- Authentication, session handling, and journals require the MongoDB API; ensure `VITE_MONGODB_API_URL` is configured for Netlify deployments.
