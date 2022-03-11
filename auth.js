const jwt = require('jsonwebtoken')
const utils = require('./utils')
const SECRET = process.env.SERVER_SECRET

module.exports = function _checkToken (req, res, next) {
  if (req.method !== 'POST') return next()
  
  const token = utils.getMetaItem(req.headers['upload-metadata'], 'Bearer')

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send(err)
    const fileName = utils.getMetaItem(req.headers['upload-metadata'], 'filename')
    if (fileName.match(decoded.path)) return next()
    res.status(401).send('not allowed to write')
  })
}