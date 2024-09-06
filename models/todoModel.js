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


const deleteTask = (id, callback) => {
  const sql = `DELETE FROM task WHERE id = ?`;

  db.run(sql, [id], (err) => {
    if (err) {
      return callback(err); // If there's an error, pass it to the callback
    }

    callback(null, id); // If successful, pass null for the error and return the deleted task's id
  });
};

const upadateSomeTask = (id, title, description, callback, req, res) => {
  const sql = `UPDATE task
               SET title = COALESCE(?, title), 
                   description = COALESCE(?, description)
               WHERE id = ?;
               `;
  db.run(sql, [title || null, description || null, id], function (err) {
    if (err) {
      console.log("this is call");
      return callback(err);
    }
    if (this.changes === 0) {
      console.log("changes call");
      return callback(null, null); // Indicating no row was updated
    }
    console.log("3rd call");
    callback(null, { id, title, description });
  });
};

module.exports = {
  addTask,
  getAllTasks,
  getItemById,

  deleteTask,
  upadateSomeTask,
};
