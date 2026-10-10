function createChatController({ chatService, documentStore }) {
  return {
    history: async (request, response, next) => {
      try {
        const { documentId } = request.params
        if (!await documentStore.getDocument(documentId)) return response.status(404).json({ error: 'Document not found.' })
        const conversation = await documentStore.getLatestConversation(documentId)
        if (!conversation) return response.json({ conversationId: null, messages: [] })
        return response.json({ conversationId: conversation.id, messages: await documentStore.getMessages(conversation.id) })
      } catch (error) { return next(error) }
    },
    answer: async (request, response, next) => {
      try {
        const { question, documentId, conversationId, history = [] } = request.body
        if (!question || typeof question !== 'string') return response.status(400).json({ error: 'A question is required.' })
        if (documentId && !await documentStore.getDocument(documentId)) return response.status(404).json({ error: 'Document not found.' })
        return response.json(await chatService.answer({ question, documentId, conversationId, history: Array.isArray(history) ? history : [] }))
      } catch (error) { return next(error) }
    },
  }
}

module.exports = { createChatController }
