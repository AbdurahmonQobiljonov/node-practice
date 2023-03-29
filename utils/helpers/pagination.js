const PAGE_SIZE = require('../constants/pagination')
const Tour = require('../../models/Tour')

const getResults = async (page, limit = PAGE_SIZE) => {
  const results = await Tour.find()
    .skip(limit * (page - 1))
    .limit(limit)
    .exec()

  const count = await Tour.countDocuments().exec()
  const pageCount = Math.ceil(count / limit)

  return {
    results,
    pageCount,
    itemCount: count,
    page,
    hasNextPage: page < pageCount,
    hasPreviousPage: page > 1,
  }
}

module.exports = {
  getResults,
}
