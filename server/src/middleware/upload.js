const multer = require('multer')
const { maxFileSize } = require('../config/env')

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxFileSize } })

module.exports = { upload }
