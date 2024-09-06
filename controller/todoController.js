const {
  getAllTasks,
  addTask,
  getItemById,
  deleteTask,
  upadateSomeTask
} = require("../models/todoModel");
const {STATUS_CODE} =  require('../config/constant')

const createTask = (req, res) => {
  // Use the parsed body from middleware
  const { title, description } = req.body;



  addTask(title, description, (err, task) => {
    if (err) {
      console.error("Error adding task:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Failed to add task" }));
    } else {
      console.log("Task added successfully:", task);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(task));
    }
  });
};

const getTask = (req, res) => {
  getAllTasks((err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Failed to retrieve tasks" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: STATUS_CODE.OK,
          message: "Task retrieved successfully",
          totalData:data.length,
          data: data,
        })
      );
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
      res.end(JSON.stringify({
        status: STATUS_CODE.OK,
        message: `Task retrieved successfully on this id:${id}`,
        data: task
      }));
    }
  });
};



const upadateSomeData = (req, res,id) => {

    const { title, description } = req.body;
    
    upadateSomeTask(id, title, description, (err, task) => {
      console.log("task",task);
      if (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Failed to retrieve task" }));
      } else if (!task) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ID not found" }));
      } else {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(task));
      }
    })
  
}

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
 
  deleteData,
  upadateSomeData
};
