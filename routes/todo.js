const url = require("url"); // Corrected 'uri' to 'url'
const { getTask, createTask } = require("../controller/taskScheduler");

const TaskRoute = (req, res) => {
    const parsedUrl = url.parse(req.url, true); 
    
    
  if (req.method === "POST" && parsedUrl.pathname === "/addtask") {
    createTask(req, res);
  } else if (req.method === "GET" && parsedUrl.pathname === "/gettask") {
    getTask(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

module.exports = TaskRoute;

