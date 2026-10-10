class OpenAiLlmProvider {
  constructor(client, model) {
    this.client = client
    this.model = model
  }

  async answer(question, matches, history) {
    const context = matches.map((match, index) => `[Source ${index + 1}] ${match.text}`).join('\n\n')
    const result = await this.client.chat.completions.create({
      model: this.model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: 'Answer using only the provided PDF context. If the answer is not present, say so clearly. Cite source numbers like [Source 1].' },
        ...history.slice(-6).map((message) => ({ role: message.role, content: message.content })),
        { role: 'user', content: `PDF context:\n${context}\n\nQuestion: ${question}` },
      ],
    })
    return result.choices[0].message.content || 'I could not generate an answer.'
  }
}

module.exports = { OpenAiLlmProvider }