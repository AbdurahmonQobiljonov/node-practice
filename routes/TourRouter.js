const express = require('express')
const {
  getAllTours,
  postTour,
  getOneTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController')

const useParam = require('../middlewares/param')

const tourRouter = express.Router()

tourRouter.param('id', useParam)

tourRouter.get('/', getAllTours)
tourRouter.post('/', postTour)

tourRouter.get('/:id', getOneTour)
tourRouter.patch('/:id', updateTour)
tourRouter.delete('/:id', deleteTour)

module.exports = tourRouter
