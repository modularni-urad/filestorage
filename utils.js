const removeDiacritics = require('diacritics').remove

function getMetaItem (metadata, name) {
  const regex = new RegExp(`${name} (.+)$`)
  try {
    const line = metadata.split(',').find(i => i.match(regex))
    return Buffer.from(line.match(regex)[1], 'base64').toString('utf-8')
  } catch (_) {
    return ''
  }
}
exports.getMetaItem = getMetaItem

exports.getFileName = function (metadata) {
  const fileName = getMetaItem(metadata, 'filename')
  return removeDiacritics(fileName).replace(/ /g,'')
}