function cosineSimilarity(left, right) {
  let dot = 0
  let leftLength = 0
  let rightLength = 0
  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index]
    leftLength += left[index] ** 2
    rightLength += right[index] ** 2
  }
  return dot / ((Math.sqrt(leftLength) * Math.sqrt(rightLength)) || 1)
}

class InMemoryVectorStore {
  constructor(documentStore) { this.documentStore = documentStore }

  async search(queryEmbedding, documentId, limit = 5) {
    return (await this.documentStore.getChunks(documentId))
      .map((chunk) => ({ ...chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
      .sort((left, right) => right.score - left.score)
      .slice(0, limit)
  }
}

module.exports = { InMemoryVectorStore }
