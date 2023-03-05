const morgan = require('morgan')
const express = require('express')
const userRouter = require('./routes/UserRouter')
const tourRouter = require('./routes/TourRouter')
const { useRedirect } = require('./middlewares/redirect')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  console.log(process.env.NODE_ENV)
}
app.use(useRedirect)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter)
app.use(express.static(`${__dirname}/public`))

module.exports = app
