const morgan = require('morgan')
const express = require('express')
const { connect } = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/UserRouter')
const tourRouter = require('./routes/TourRouter')
const { useRedirect } = require('./middlewares/redirect')

dotenv.config({ path: './.env' })

const app = express()
const db = process.env.DB_URI.replace('ADMIN', process.env.ADMIN).replace(
  'PASSWORD',
  process.env.PASSWORD
)

connect(db).then(() => {
  console.log('DB connection successful!')
})

app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(useRedirect)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  console.log(process.env.NODE_ENV)
}

app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter)

module.exports = app
