const router = require('express').Router();
const get_statistics = require('./modules/zip-archive');
const db = require('./db');
const fs = require('fs');


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
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const file = req.files.file;
            const filePath = './public/export.zip';
            await file.mv(filePath);
            const {date, volume, count} = get_statistics();
            let sql = `INSERT INTO history (count, date, volume) VALUES( ${count}, "${date}", ${volume});`;
            db.all(sql, [], (err) => {
                if (err) console.log(err);
                fs.unlinkSync(filePath);
            });

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
