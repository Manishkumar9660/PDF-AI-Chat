# PDF AI Chat
Link - https://pdf-ai-chat-g2ajgu164-mk5363339-9643s-projects.vercel.app/
A retrieval-augmented PDF chat application. Upload a PDF, index its text, search relevant chunks, and ask questions grounded in the document.

## Project structure

- `client/`: React + TypeScript + Vite frontend
- `server/`: Express API, PDF processing, AI providers, vector search, and Prisma persistence
- `server/prisma/`: Prisma schema and committed database migrations

## Requirements

- Node.js 18.18 or newer
- npm
- Gemini or OpenAI API key for hosted AI responses (optional; local fallback is available)

## Setup

### Backend

```powershell
cd server
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev
npm start
```

Set `DATABASE_URL` in `server/.env` to the SQL database you want to use. The default is local SQLite:

```env
DATABASE_URL="file:./dev.db"
```

Choose an AI provider in `server/.env`:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
```

or:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_key_here
```

### Frontend

In a second terminal:

```powershell
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Database tools

```powershell
cd server
npm run db:studio
```

Do not commit `.env`, API keys, `node_modules`, or `server/prisma/dev.db`. Migrations under `server/prisma/migrations` are safe to commit.
