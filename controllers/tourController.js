const Tour = require('../models/Tour')

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({})
    res.status(200).json({
      status: 'success',
      results: tours.length,
      tours,
    })
  } catch (error) {
    res.status(403).json({
      status: 'error',
      message: error.message,
    })
  }
}

const postTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: newTour,
    })
  } catch (error) {
    res.status(403).json({
      status: 'error',
      message: 'Invalid data sent!',
    })
  }
}

const getOneTour = async (req, res) => {
  try {
    const { id } = req.params
    const tour = await Tour.findById(id)
    res.status(200).json(tour)
  } catch (error) {
    res.status(403).json({
      status: 'error',
      message: error.message,
    })
  }
}

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params
    await Tour.findByIdAndDelete(id)
    res.status(200).json({
      status: 'success',
      message: 'Tour has been deleted succesfull!',
    })
  } catch (error) {
    res.status(403).json({
      status: 'error',
      message: error.message,
    })
  }
}

const updateTour = async (req, res) => {
  try {
    const { id } = req.params
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      message: 'Updated',
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(403).json({
      status: 'error',
      message: error.message,
    })
  }
}

module.exports = {
  getAllTours,
  getOneTour,
  postTour,
  deleteTour,
  updateTour,
}
