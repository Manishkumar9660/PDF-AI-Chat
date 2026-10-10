class GeminiEmbeddingProvider {
  constructor(client, model) {
    this.client = client
    this.model = model
  }

  async embed(text) {
    const model = this.client.getGenerativeModel({ model: this.model })
    const result = await model.embedContent(text)
    return result.embedding.values
  }
}

module.exports = { GeminiEmbeddingProvider }