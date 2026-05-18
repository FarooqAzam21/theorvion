# 🚀 The Orvion RAG Chatbot — Setup Guide

## Prerequisites
- Node.js 18+ installed
- **Ollama** installed and running ([ollama.com](https://ollama.com))
- Models pulled:
  ```powershell
  ollama pull qwen2.5:0.5b
  ollama pull nomic-embed-text
  ```
---

## Step 1 — Configure the Server

Edit `server/.env` to point to your local Ollama instance:

```
OLLAMA_HOST=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:0.5b
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
```

---

## Step 2 — Install Server Dependencies

```powershell
cd server
npm install
```

---

## Step 4 — Start the Backend Server

The server auto-ingests the knowledge base on first start:

```powershell
# From the server/ directory
npm run dev
```

You should see:
```
INFO   Starting The Orvion RAG Server...
RAG    Starting RAG ingestion pipeline...
RAG    Loaded N chunks from about.json
...
OK     Vector store saved — N documents
OK     🚀 Orvion RAG Server running on http://localhost:3001
```

> ⚡ First start takes ~30–60 seconds to embed all knowledge chunks via your local Ollama instance.

---

## Step 5 — Start the Frontend

In a **second terminal**, from the project root:

```powershell
cd c:\Users\Farooq\Desktop\Orvion
npm run dev
```

Open: **http://localhost:5173**

---

## Step 6 — Test the Chatbot

1. Open your website in the browser
2. Look for the **purple floating button** (bottom-right corner)
3. Click it — the chat window opens
4. Try the quick prompts or type your own question!

---

## Re-Ingesting the Knowledge Base

If you update the knowledge base files in `server/data/knowledge/`:

```powershell
# From server/ directory — re-embed everything
node scripts/ingest.js --force

# Or call the API endpoint:
curl -X POST http://localhost:3001/api/ingest -H "Content-Type: application/json" -d "{\"force\": true}"
```

---

## Adding Your Own Knowledge

Add new JSON files to `server/data/knowledge/` following this format:

```json
{
  "source": "your_topic",
  "title": "Your Topic Title",
  "content": [
    {
      "section": "Section Name",
      "text": "Full paragraph of knowledge here..."
    }
  ]
}
```

Then re-run ingestion with `--force`.

---

## API Endpoints

| Method | Endpoint       | Description                            |
|--------|---------------|----------------------------------------|
| GET    | `/api/health` | Server status + vector store info      |
| POST   | `/api/chat`   | Send message, get RAG response         |
| POST   | `/api/ingest` | Re-ingest knowledge base (force=true)  |

### Chat request example:
```json
POST /api/chat
{
  "message": "What services does The Orvion offer?",
  "history": []
}
```

### Chat response example:
```json
{
  "success": true,
  "answer": "The Orvion offers...",
  "sources": [{ "title": "The Orvion Services", "section": "Web Development", "score": 87 }],
  "confidence": 82,
  "latencyMs": 1240
}
```

---

## Project Structure

```
Orvion/
├── src/
│   ├── components/chat/
│   │   ├── ChatWidget.jsx     # Floating launcher button
│   │   ├── ChatWindow.jsx     # Main chat panel
│   │   ├── ChatMessage.jsx    # Message bubbles + citations
│   │   └── ChatInput.jsx      # Input + send button
│   ├── hooks/
│   │   └── useChat.js         # Chat state management
│   └── services/
│       └── chatApi.js         # API service
│
└── server/
    ├── index.js               # Express server entry point
    ├── routes/                # chat / ingest / health
    ├── services/
    │   ├── embeddingService.js  # Ollama nomic-embed-text
    │   ├── vectorStore.js       # Local JSON vector store
    │   ├── retrievalService.js  # Semantic search
    │   └── chatService.js       # RAG orchestrator (Ollama)
    ├── rag/
    │   ├── chunker.js           # Document splitting
    │   ├── pipeline.js          # Ingestion pipeline
    │   └── promptBuilder.js     # Prompt construction
    ├── data/
    │   ├── knowledge/           # JSON knowledge base files
    │   └── vector-store/        # Auto-generated embeddings
    └── scripts/
        └── ingest.js            # Standalone ingestion script
```

---

## Upgrading to Pinecone (Optional)

The `vectorStore.js` uses a clean interface. To swap to Pinecone:

1. Install: `npm install @pinecone-database/pinecone`
2. Replace `server/services/vectorStore.js` with Pinecone SDK calls
3. All other code stays exactly the same

---

## Deployment

### Backend (Railway / Render / DigitalOcean)
1. Push `server/` to your repo
2. Set `GEMINI_API_KEY` and `FRONTEND_URL` as environment variables
3. Set start command: `node index.js`

### Frontend (Vercel / Netlify)
1. Set environment variable: `VITE_API_URL=https://your-backend-url.com`
2. Deploy normally with `npm run build`
