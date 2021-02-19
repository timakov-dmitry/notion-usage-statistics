const AdmZip = require('adm-zip')

function getStatistics () {
  const zip = new AdmZip('./public/export.zip')
  const zipEntries = zip.getEntries()
  return {
    date: zipEntries[0].header.time,
    volume: zipEntries.reduce((acc, el) => acc + el.header.size, 0),
    count: zipEntries.length
  }
}

function saveFile (file, path) {
  return file.mv(path)
}

module.exports = {
  saveFile,
  getStatistics
}
