var fs = require('fs')
var tus = require('tus-js-client')

var path = `${__dirname}/../../README.md`
var file = fs.createReadStream(path)
var size = fs.statSync(path).size

module.exports = (g) => {
  //
  const r = g.chai.request(g.baseurl)

  return describe('upload', () => {
    
    it('must not create any file coz not authorized', (done) => {
      var options = {
        endpoint: g.baseurl,
        metadata: {
          filename: 'README.md',
          filetype: 'text/plain',
          Bearer: 'not valid'
        },
        uploadSize: size,
        onError (error) {
          done()
        },
        onSuccess () {
          done('upload shall fail')
        }
      }
      
      var upload = new tus.Upload(file, options)
      upload.start()
    })

    it('must not create any file coz not allowed to write desired file', (done) => {
      var options = {
        endpoint: g.baseurl,
        metadata: {
          filename: 'README.md',
          filetype: 'text/plain',
          Bearer: g.token
        },
        uploadSize: size,
        onError (error) {
          done()
        },
        onSuccess () {
          done('upload shall fail')
        }
      }
      
      var upload = new tus.Upload(file, options)
      upload.start()
    })

    it('shall create file', (done) => {
      var options = {
        endpoint: g.baseurl,
        metadata: {
          filename: '/folděr 1/REAĎME.md',
          filetype: 'text/plain',
          Bearer: g.token
        },
        uploadSize: size,
        onError (error) {
          done(error)
        },
        onSuccess () {
          done()
        }
      }
      
      var upload = new tus.Upload(file, options)
      upload.start()
    })

  })
}
