const fs = require('fs')

const readFilePro = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        return reject("Couldn't find the file")
      }
      resolve(JSON.parse(data))
    })
  })
}

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve('succes')
    })
  })
}

module.exports = {
  writeFilePro,
  readFilePro,
}
