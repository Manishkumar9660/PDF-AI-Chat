function createLocalEmbedding(text) {
  const vector = Array.from({ length: 128 }, () => 0)
  for (const token of text.toLowerCase().match(/[a-z0-9]{2,}/g) || []) {
    let hash = 2166136261
    for (const character of token) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619)
    vector[Math.abs(hash) % vector.length] += 1
  }
  const length = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1
  return vector.map((value) => value / length)
}

class LocalEmbeddingProvider {
  async embed(text) { return createLocalEmbedding(text) }
}

module.exports = { LocalEmbeddingProvider }
