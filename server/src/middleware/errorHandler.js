function errorHandler(error, _request, response, _next) {
  console.error(error)
  if (error.code === 'LIMIT_FILE_SIZE') return response.status(413).json({ error: 'PDFs must be smaller than 20 MB.' })
  return response.status(500).json({ error: 'Unexpected server error.' })
}

module.exports = { errorHandler }
