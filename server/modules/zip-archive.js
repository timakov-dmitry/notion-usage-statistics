const AdmZip = require('adm-zip');

function get_statistics() {
    const zip = new AdmZip('./public/export.zip');
    const zipEntries = zip.getEntries();
    return {
        date: zipEntries[0].header.time,
        volume: zipEntries.reduce((acc, el) => acc + el.header.size, 0),
        count: zipEntries.length
    }
}

module.exports = get_statistics;
