const useRedirect = (req, res, next) => {
  console.log('hello from the middleware 🤣')
  next()
}

module.exports = {
  useRedirect,
}