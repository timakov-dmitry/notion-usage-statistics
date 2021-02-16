var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./store.db');

db.serialize(function() {
    // db.run("CREATE TABLE history (count INTEGER, date TEXT, volume INTEGER)");
});

module.exports = db;
