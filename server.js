const dotenv = require('dotenv')
const app = require('./index')

dotenv.config({ path: './.env' })

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`listening port ${PORT}`)
})
