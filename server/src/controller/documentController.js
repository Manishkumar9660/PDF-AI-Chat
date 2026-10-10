function createDocumentController({ documentService, documentStore }) {
  return {
    list: async (_request, response, next) => {
      try { return response.json(await documentStore.listDocuments()) } catch (error) { return next(error) }
    },
    upload: async (request, response, next) => {
      try {
        if (!request.file || request.file.mimetype !== 'application/pdf') return response.status(400).json({ error: 'Please upload a PDF file.' })
        return response.status(201).json(await documentService.indexPdf(request.file))
      } catch (error) { return next(error) }
    },
  }
}

module.exports = { createDocumentController }
