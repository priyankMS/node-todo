const { getAllTasks, addTask } = require("../models/taskModel");

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

module.exports = { getTask, createTask };
