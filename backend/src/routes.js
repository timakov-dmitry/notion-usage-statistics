const router = require('express').Router();
const {getStatistics, saveFile} = require('./modules/zip-archive');
const db = require('./db');
const fs = require('fs');
const { historyExists, insertIntoHistory } = require('./persistence/upload');
const {resolve} = require('path');

router.get('/', (req, res) => {
    db.all('SELECT count, date, volume FROM history;', [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
        res.json(rows)
    });
});

router.post('/', async (req, res) => {
    if (!req.files) {
        res.send({  
            status: false,
            message: 'No file uploaded'
        });
        return
    }

    try {
        const file = req.files.file;
        const filePath = resolve('./public/export.zip');
        await saveFile(file, filePath);

        const {date, volume, count} = getStatistics();

        if (await historyExists(db, date)) {
            res.send({  
                status: false,
                message: 'The file already exists. Please select another file'
            });
            return
        }

        await insertIntoHistory(date, volume, count, filePath);

        res.status(200).send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;
