const pdfParse = require('pdf-parse')

async function extractPdf(fileBuffer) {
  const parsed = await pdfParse(fileBuffer)
  return { text: parsed.text, pages: parsed.numpages }
}

module.exports = { extractPdf }
