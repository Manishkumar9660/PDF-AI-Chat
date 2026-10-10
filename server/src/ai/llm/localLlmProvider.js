class LocalLlmProvider {
  async answer(_question, matches) {
    if (!matches.length) return 'I could not find relevant content in the uploaded documents.'
    return `Based on the document, ${matches[0].text}\n\nRelevant sections:\n${matches.map((match) => `- ${match.text.slice(0, 260)}`).join('\n')}`
  }
}

module.exports = { LocalLlmProvider }
