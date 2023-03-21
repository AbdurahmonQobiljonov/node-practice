const { connect } = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Tour = require('../../models/Tour')

dotenv.config({ path: './.env' })

const db = process.env.DB_URI.replace('ADMIN', process.env.ADMIN).replace(
  'PASSWORD',
  process.env.PASSWORD
)

connect(db).then(() => {
  console.log('DB connection successful!')
})

// Read Json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

// import data to DB

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data imported successful')
  } catch (e) {
    console.log(e.message)
  } finally {
    process.exit()
  }
}

// delete all data from DB

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Your DB has been cleaned')
  } catch (e) {
    console.log(e.message)
  } finally {
    process.exit()
  }
}

if (process.argv[2] === '--import') {
  importData()
}
if (process.argv[2] === '--delete') {
  deleteData()
}

