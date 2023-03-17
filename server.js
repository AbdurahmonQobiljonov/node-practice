const dotenv = require('dotenv')
const http = require('http')
const app = require('./index')

dotenv.config({ path: './.env' })

const PORT = process.env.PORT || 8000
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`listening port ${PORT}`)
})
