const fs = require('fs')

let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`))

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    tours,
  })
}

const postTour = (req, res) => {
  const data = req.body
  const newId = tours[tours.length - 1]._id + 1
  const newTour = Object.assign({ _id: newId }, data)
  tours.push(newTour)
  res.status(201).json({
    status: 'success',
    data: newTour,
  })
}

const getOneTour = (req, res) => {
  const id = req.params.id
  const tour = tours.find((tour) => tour._id === id)
  res.status(200).json(tour)
}

const deleteTour = (req, res) => {
  const id = req.params.id
  tours = tours.filter((elem) => elem._id !== id)
  res.status(200).json(tours)
}

const updateTour = (req, res) => {
  const id = req.params.id
  const tour = tours.find((tour) => tour._id === id)
  res.status(200).json({
    status: 'success',
    message: 'Updated',
    data: {
      tour,
    },
  })
}

module.exports = {
  getAllTours,
  getOneTour,
  postTour,
  deleteTour,
  updateTour,
}
