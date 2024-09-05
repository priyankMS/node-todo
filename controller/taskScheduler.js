const {
  getAllTasks,
  addTask,
  getItemById,
  updateTask,
  deleteTask,
} = require("../models/taskModel");

const createTask = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { title, description } = JSON.parse(body);
    addTask(title, description, (err, task) => {
      // Ensure callback is passed here
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Failed to add task" }));
      } else {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(task));
      }
    });
  });
};

const getTask = (req, res) => {
  getAllTasks((err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Failed to retrieve tasks" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    }
  });
};

const getTaskById = (req, res, id) => {
  getItemById(id, (err, task) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Failed to retrieve task" }));
    } else if (!task) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "id not found " }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(task));
    }
  });
};

const upadateData = (req, res, id) => {
  let body = "";

  // Collecting chunks of data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // Parsing data when the request ends
  req.on("end", () => {
    const { title, description } = JSON.parse(body);

    updateTask(id, title, description, (err, task) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Failed to retrieve task" }));
      } else if (!task) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ID not found" }));
      } else {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(task));
      }
    });
  });
};

const deleteData = (req, res) => {
  const id = req.url.split("/")[2];
  deleteTask(id, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Failed to delete this task" }));
    } else if (!data) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "id not found" }));
    } else {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Task deleted", id: data }));
    }
  });
};

module.exports = {
  getTask,
  createTask,
  getTaskById,
  upadateData,
  deleteData,
};
