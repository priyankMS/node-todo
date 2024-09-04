const sqlDB = require('sqlite3')
const db = new sqlDB.Database('./database.sqlite');


db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS task(
        id INTEGER PRIMARY KEY AUTOINCREMENT  , 
        title TEXT NOT NULL,
         description TEXT
      ) 
    `)
})
  

module.exports = db;

