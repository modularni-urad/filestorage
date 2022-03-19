const jwt = require('jsonwebtoken')
const path = require('path')
const rimraf = require('rimraf')

module.exports = (g) => {
  process.env.NODE_ENV = 'test'
  process.env.SERVER_SECRET = 'secret'
  process.env.DATA_FOLDER = path.resolve('./.files')
  const port = process.env.PORT || 3333
  const mockUser = { paths: ['/folder1/*'] }
  Object.assign(g, {
    port,
    baseurl: `http://localhost:${port}`,
    mockUser,
    token: jwt.sign(mockUser, process.env.SERVER_SECRET, { expiresIn: '6h' })
  })
  
  g.InitApp = async function (app) {
    
    app.use((err, req, res, next) => {
      console.error(err)
      res.status(500).send(err)
    })

    return new Promise((resolve, reject) => {
      g.server = app.listen(port, '127.0.0.1', (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
  
  g.close = function(done) {
    g.server.close()
    setTimeout(() => {
      let p = path.join(__dirname, '..', 'chunks')
      console.log('cleaning', p)
      rimraf.sync(p)
      console.log('cleaning', p)
      p = path.join(__dirname, '..', '.files')
      rimraf.sync(p)
      console.log('clean')
      done()
    }, 1900)
  }
}