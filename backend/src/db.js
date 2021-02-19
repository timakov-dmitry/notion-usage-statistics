const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./store.db')
const fs = require('fs')

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS history (count INTEGER, date TEXT, volume INTEGER)')
})

const isHistoryExists = (date) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT COUNT(*) as count FROM history WHERE date="${date}";`, [], (err, rows) => {
      if (err) reject(err)
      resolve(rows[0].count > 0)
    })
  })
}

const insertHistory = (date, volume, count, filePath) => {
  return new Promise((resolve, reject) => {
    db.all(`INSERT INTO history (count, date, volume) VALUES( ${count}, "${date}", ${volume})`, [], (err) => {
      if (err) reject(err)
      fs.unlinkSync(filePath)
      resolve()
    })
  })
}

const getHistory = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT count, date, volume FROM history', [], (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

module.exports = {
  isHistoryExists,
  insertHistory,
  getHistory
}
