const { Schema, model } = require('mongoose')

const TourSchema = Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  duration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    default: 'easy'
  }
})

module.exports = model('Tour', TourSchema)
