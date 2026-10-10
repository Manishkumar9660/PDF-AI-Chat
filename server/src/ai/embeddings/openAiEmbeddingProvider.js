class OpenAiEmbeddingProvider {
  constructor(client, model) {
    this.client = client
    this.model = model
  }

  async embed(text) {
    const result = await this.client.embeddings.create({ model: this.model, input: text })
    return result.data[0].embedding
  }
}

module.exports = { OpenAiEmbeddingProvider }