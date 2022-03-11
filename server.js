const app = require('./index')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 1080

app.listen(port, host, err => {
  if (err) throw err
  console.log(`tusuploader listens on ${host}:${port}`)
})