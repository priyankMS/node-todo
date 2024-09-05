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

const updateTask = (id, title, description, callback, req, res) => {
  console.log(id, description, title);
  const sql = `UPDATE task SET title = ?, description = ? WHERE id = ?`;
  db.run(sql, [title, description, id], function (err) {
    if (err) {
      // Return the error in the callback
      return callback(err);
    }

    if (this.changes === 0) {
      return callback(null, null); // Indicating no row was updated
    }

    // Success case
    callback(null, { id, title, description });
  });
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

module.exports = {
  addTask,
  getAllTasks,
  getItemById,
  updateTask,
  deleteTask,
};
