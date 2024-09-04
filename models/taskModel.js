const db = require("../database/db");

const addTask = (title, description, callback) => {
  const sql = `INSERT INTO task (title, description) VALUES (?, ?)`;
  db.run(sql, [title, description], function (err) {
    // Ensure callback is a function before calling it
    if (typeof callback === "function") {
      callback(err, { id: this.lastID, title, description });
    } else {
      console.error("Callback is not a function");
    }
  });
};

const getAllTasks = (callback) => {
  db.all(`SELECT * FROM task`, [], (err, rows) => {
    callback(err, rows);
  });
};

const getItemById = (id, callback) => {
  const sql = `SELECT * FROM task WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row); 
    }
  });
    console.log("done");
};



module.exports = { addTask, getAllTasks ,getItemById};
