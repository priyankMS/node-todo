const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// Open the database and perform operations
db.serialize(() => {
  console.log("Database connected successfully.");

  // Create the table if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS task (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT NOT NULL,
      description TEXT
    )
  `);

});




  
 

// Export the database object
module.exports = db;
