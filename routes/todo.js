const url = require("url");
const {
  getTask,
  createTask,
  getTaskById,
  upadateData
} = require("../controller/taskScheduler");

const TaskRoute = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
 console.log(pathname);
  if (req.method === "POST" && pathname === "/addtask") {
    createTask(req, res);
  } else if (req.method === "GET" && pathname === "/gettask") {
    getTask(req, res);
  } else if (req.method === "GET" && pathname.startsWith("/gettask/")) {
    const id = pathname.split("/")[2]; // Extracting the id from the URL
    if (id) {
      console.log(id);
      getTaskById(req, res, id);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    }
  }
    
    else if (req.method === "PUT" && pathname === "updateTask") {
    const id = pathname.split("/")[2]
    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({message:"Invalid ID"}))
    }
    else{
      console.log("update id",id);
       upadateData()
    }
    }

  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

module.exports = TaskRoute;
