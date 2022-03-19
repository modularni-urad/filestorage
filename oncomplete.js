const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const mv = require('mv')
const utils = require('./utils')
const consts = require('./consts')

module.exports = async (event) => {
  // console.log(`Upload complete for file ${event.file.id}`)
  const fileName = utils.getMetaItem(event.file.upload_metadata, 'filename')
  const filePath = path.join(consts.DATA_FOLDER, fileName)
  assertFolder(path.dirname(filePath))
  await makeBackup(filePath)
  const uploaded = path.join(process.cwd(), consts.STORAGE_PATH, event.file.id)
  mv(uploaded, filePath, err => {
    err && console.error(err)
  })
}

async function assertFolder (folder) {
  try {
    await fs.promises.stat(folder)
  } catch (e) {
    if (e.code !== 'ENOENT') throw e
    mkdirp.sync(folder)
  }
}

async function makeBackup (filePath) {
  try {
    await fs.promises.stat(filePath)
    fs.promises.rename(filePath, `${filePath}.back`)  // backup
  } catch (e) {
    if (e.code !== 'ENOENT') throw e
  }
}