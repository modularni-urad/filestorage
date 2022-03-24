const jwt = require('jsonwebtoken')
const utils = require('./utils')
const SECRET = process.env.SERVER_SECRET

function _isAllowedToWrite (paths, fileName) {
  for (let i = 0; i < paths.length; i++) {
    if (fileName.match(paths[i])) return true
  }
  return false
}

module.exports = function _checkToken (req, res, next) {
  if (req.method !== 'POST') return next()
  
  const token = utils.getMetaItem(req.headers['upload-metadata'], 'Bearer')

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send(err)
    const fileName = utils.getFileName(req.headers['upload-metadata'])
    if (_isAllowedToWrite(decoded.paths, fileName)) return next()
    res.status(401).send('not allowed to write')
  })
}