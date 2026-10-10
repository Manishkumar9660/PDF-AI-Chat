function splitText(text, size = 1200, overlap = 180) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  const result = []
  for (let start = 0; start < normalized.length; start += size - overlap) {
    const value = normalized.slice(start, start + size).trim()
    if (value.length > 40) result.push(value)
  }
  return result
}

module.exports = { splitText }
