const AdmZip = require('adm-zip');

function getStatistics() {
    const zip = new AdmZip('./public/export.zip');
    const zipEntries = zip.getEntries();
    return {
        date: zipEntries[0].header.time,
        volume: zipEntries.reduce((acc, el) => acc + el.header.size, 0),
        count: zipEntries.length
    }
}

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

function saveFile(file, path){
    return file.mv(path);
}

module.exports = {
    saveFile,
    getStatistics
}
// module.exports = getStatistics;
