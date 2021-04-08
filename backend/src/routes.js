const router = require('express').Router()
const { resolve } = require('path')
const { getStatistics, saveFile } = require('./modules/zip-archive')
const db = require('./db')
const moment = require('moment')

router.get('/', async (req, res) => {
  try {
    const rows = await db.getHistory()
    rows.forEach(record => {
        record.ts = moment(Date.parse(record.date)).unix()
      })
    rows.sort((a, b) => a.ts < b.ts ? -1 : 1)
    res.json(rows)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

router.post('/', async (req, res) => {
  if (!req.files) {
    res.status(400).send({
      status: false,
      message: 'No file uploaded'
    })
    return
  }

  try {
    const file = req.files.file
    const filePath = resolve('./public/export.zip')
    await saveFile(file, filePath)

    const { date, volume, count } = getStatistics()

    if (await db.isHistoryExists(date)) {
      res.status(400).send({
        status: false,
        message: 'The file already exists. Please select another file'
      })
      return
    }

    await db.insertHistory(date, volume, count, filePath)

    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        name: file.name,
        mimetype: file.mimetype,
        size: file.size
      }
    })
  } catch (err) {
    console.error(err)

    res.status(500).send({
      status: false,
      message: err.message
    })
  }
})

module.exports = router
