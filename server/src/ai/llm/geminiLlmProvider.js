class GeminiLlmProvider {
  constructor(client, model) {
    this.client = client
    this.model = model
  }

  async answer(question, matches, history) {
    const context = matches.map((match, index) => `[Source ${index + 1}] ${match.text}`).join('\n\n')
    const model = this.client.getGenerativeModel({
      model: this.model,
      systemInstruction: 'Answer using only the provided PDF context. If the answer is not present, say so clearly. Cite source numbers like [Source 1].',
    })
    const chat = model.startChat({
      history: history.slice(-6).map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }],
      })),
      generationConfig: { temperature: 0.2 },
    })
    const result = await chat.sendMessage(`PDF context:\n${context}\n\nQuestion: ${question}`)
    return result.response.text() || 'I could not generate an answer.'
  }
}

module.exports = { GeminiLlmProvider }