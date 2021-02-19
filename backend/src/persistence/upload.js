const db = require('../db');
const fs = require('fs');

const historyExists = function(db, date) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT COUNT(*) as count FROM history WHERE date="${date}"`, [], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows.length > 0 && rows[0].count > 0);
        });
    });
}

const insertIntoHistory = function(date, volume, count, filePath){
    return new Promise((resolve, reject) =>{
        let sql = `INSERT INTO history (count, date, volume) VALUES( ${count}, "${date}", ${volume});`;
        db.all(sql, [], (err) => {
            if (err) reject(err)
            fs.unlinkSync(filePath);
            resolve();
        });
    });
}

module.exports = {
    historyExists,
    insertIntoHistory
}
