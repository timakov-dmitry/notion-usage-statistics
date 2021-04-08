const AdmZip = require('adm-zip')

function getStatistics () {
  const zip = new AdmZip('./public/export.zip')
  const zipEntries = zip.getEntries()
  elements = zipEntries.reduce( (acc, file) => {    
    if (file.isDirectory || !file.name.includes('.md')) return acc;
    acc += file.getData().toString('utf8').split('\n').filter(char => !!char).length
    return acc
  }, 0)
  return {
    date: zipEntries[0].header.time,
    volume: zipEntries.reduce((acc, el) => acc + el.header.size, 0),
    count: zipEntries.filter(file => file.name.includes('.md')).length,
    elements
  }
}

function saveFile (file, path) {
  return file.mv(path)
}

module.exports = {
  saveFile,
  getStatistics
}
