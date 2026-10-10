require('dotenv').config()

module.exports = {
  port: Number(process.env.PORT || 3001),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  aiProvider: process.env.AI_PROVIDER || 'gemini',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  chatModel: process.env.GEMINI_CHAT_MODEL || 'gemini-2.0-flash',
  embeddingModel: process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiChatModel: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
  openAiEmbeddingModel: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
  maxFileSize: 20 * 1024 * 1024,
}
