const Tour = require('../models/Tour')

const getAllTours = async (req, res) => {
  try {
    // Query params
    // Filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])

    //Advanced filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
    let query = Tour.find(JSON.parse(queryStr))
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }
    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }
    // pagination
    const { page = 1, limit = 100 } = req.query
    const skip = (+page - 1) * limit
    query = query.skip(skip).limit(limit)

    if (req.query.page) {
      const numTours = await Tour.countDocuments()
      if (skip > numTours) throw new Error("This page doesn't exist")
    }
    // Response
    const tours = await query
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
