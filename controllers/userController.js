const fs = require('fs')
const express =require('express')

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`))

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  })
}

module.exports = {
  getAllUsers,
}
