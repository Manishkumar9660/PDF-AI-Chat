const { createApp } = require('./src/app')
const { port } = require('./src/config/env')

createApp().listen(port, () => console.log(`PDF AI server listening on http://localhost:${port}`))
