const tus = require('tus-node-server')
const express = require('express')
const checkToken = require('./auth')
const onComplete = require('./oncomplete')
const consts = require('./consts')

const server = new tus.Server()
server.datastore = new tus.FileStore({
  path: '/' + consts.STORAGE_PATH
})

server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, onComplete)

const app = express()
app.all('*', checkToken, server.handle.bind(server))

module.exports = app