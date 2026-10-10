class ChatService {
  constructor({ store, vectorStore, embeddings, llm }) { this.store = store; this.vectorStore = vectorStore; this.embeddings = embeddings; this.llm = llm }

  async answer({ question, documentId, conversationId, history }) {
    const conversation = await this.store.getOrCreateConversation(documentId, conversationId)
    const storedHistory = await this.store.getMessages(conversation.id)
    const questionEmbedding = await this.embeddings.embed(question)
    const matches = await this.vectorStore.search(questionEmbedding, documentId)
    const answer = await this.llm.answer(question, matches, storedHistory.length ? storedHistory : history)
    await this.store.addMessages(conversation.id, [{ role: 'user', content: question }, { role: 'assistant', content: answer }])
    return { conversationId: conversation.id, answer, sources: matches.map(({ index, text, score }) => ({ index, text, score })) }
  }
}

module.exports = { ChatService }
