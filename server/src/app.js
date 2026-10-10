const cors = require('cors')
const express = require('express')
const { createAiProviders } = require('./ai/AIProviderFactory')
const { clientOrigin } = require('./config/env')
const { createChatController } = require('./controller/chatController')
const { createDocumentController } = require('./controller/documentController')
const { prisma } = require('./db/prisma')
const { DocumentStore } = require('./db/documentStore')
const { errorHandler } = require('./middleware/errorHandler')
const { upload } = require('./middleware/upload')
const { ChatService } = require('./services/chatService')
const { DocumentService } = require('./services/documentService')
const { InMemoryVectorStore } = require('./vector/inMemoryVectorStore')

function createApp() {
  const app = express()
  const documentStore = new DocumentStore(prisma)
  const providers = createAiProviders()
  const documentService = new DocumentService({ store: documentStore, embeddings: providers.embeddings })
  const chatService = new ChatService({ store: documentStore, vectorStore: new InMemoryVectorStore(documentStore), embeddings: providers.embeddings, llm: providers.llm })
  const documentController = createDocumentController({ documentService, documentStore })
  const chatController = createChatController({ chatService, documentStore })

  app.use(cors({ origin: clientOrigin }))
  app.use(express.json({ limit: '1mb' }))
  app.get('/api/health', (_request, response) => response.json({ ok: true, aiEnabled: providers.aiEnabled, provider: providers.provider }))
  app.get('/api/documents', documentController.list)
  app.post('/api/documents', upload.single('file'), documentController.upload)
  app.get('/api/documents/:documentId/history', chatController.history)
  app.post('/api/chat', chatController.answer)
  app.use(errorHandler)
  return app
}

module.exports = { createApp }
