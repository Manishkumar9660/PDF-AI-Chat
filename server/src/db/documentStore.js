class DocumentStore {
  constructor(database) { this.database = database }

  async addDocument(document, documentChunks) {
    await this.database.$transaction([
      this.database.document.create({ data: { id: document.id, name: document.name, pages: document.pages } }),
      ...documentChunks.map((chunk) => this.database.documentChunk.create({
        data: { documentId: chunk.documentId, chunkIndex: chunk.index, text: chunk.text, embedding: JSON.stringify(chunk.embedding) },
      })),
    ])
  }

  async getDocument(id) { return this.database.document.findUnique({ where: { id } }) }

  async listDocuments() {
    const documents = await this.database.document.findMany({ orderBy: { createdAt: 'desc' }, include: { _count: { select: { chunks: true } } } })
    return documents.map((document) => ({ id: document.id, name: document.name, pages: document.pages, chunks: document._count.chunks }))
  }

  async getChunks(documentId) {
    const storedChunks = await this.database.documentChunk.findMany({ where: documentId ? { documentId } : undefined })
    return storedChunks.map((chunk) => ({ documentId: chunk.documentId, index: chunk.chunkIndex, text: chunk.text, embedding: JSON.parse(chunk.embedding) }))
  }

  async getOrCreateConversation(documentId, conversationId) {
    if (conversationId) {
      const existing = await this.database.conversation.findFirst({ where: { id: conversationId, documentId } })
      if (existing) return existing
    }
    return this.database.conversation.create({ data: { id: conversationId || require('crypto').randomUUID(), documentId } })
  }

  async addMessages(conversationId, messages) {
    if (!messages.length) return
    await this.database.message.createMany({ data: messages.map((message) => ({ conversationId, role: message.role, content: message.content })) })
  }

  async getMessages(conversationId) {
    return this.database.message.findMany({ where: { conversationId }, orderBy: { createdAt: 'asc' }, select: { role: true, content: true } })
  }

  async getLatestConversation(documentId) {
    return this.database.conversation.findFirst({ where: { documentId }, orderBy: { updatedAt: 'desc' } })
  }
}

module.exports = { DocumentStore }
