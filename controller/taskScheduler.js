const { getAllTasks, addTask,getItemById } = require("../models/taskModel");

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


module.exports = { getTask, createTask ,getTaskById };
