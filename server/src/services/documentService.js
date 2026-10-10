const crypto = require('crypto')
const { splitText } = require('../vector/textChunker')
const { extractPdf } = require('../uploads/pdfTextExtractor')

class DocumentService {
  constructor({ store, embeddings }) { this.store = store; this.embeddings = embeddings }

  async indexPdf(file) {
    const parsed = await extractPdf(file.buffer)
    const id = crypto.randomUUID()
    const texts = splitText(parsed.text)
    const documentChunks = []
    for (const [index, text] of texts.entries()) documentChunks.push({ documentId: id, index, text, embedding: await this.embeddings.embed(text) })
    const document = { id, name: file.originalname, pages: parsed.pages, chunks: documentChunks.length }
    await this.store.addDocument(document, documentChunks)
    return document
  }
}

module.exports = { DocumentService }
