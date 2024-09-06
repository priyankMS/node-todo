const url = require("url");
const {
  getTask,
  createTask,
  getTaskById,

  deleteData,
  upadateSomeData,
} = require("../controller/todoController");

const {
  checkPostDataMiddleware,
  updateDataMiddlerware,
} = require("../middleware/todoMiddleware");

const TaskRoute = (req, res) => {
  console.log("req", req.method);
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  //POST DATA
  if (req.method === "POST" && pathname === "/addtask") {
    console.log("this is call");
    checkPostDataMiddleware(req, res, () => {
      console.log("Middleware validation passed, calling createTask");

      createTask(req, res);
    });

    //GET DATA
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

    //UPADATE DATA
  } else if (req.method === "PUT" && pathname.startsWith("/updateTask")) {
    
    
    const id = pathname.split("/")[2];
    console.log(typeof id);
    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "please enter id" }));
    } else if ( id < 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "please enter valid id" }));
    } else {
      console.log("update id", id);
      updateDataMiddlerware(req, res, () => {
        console.log("call this middleware ");
        upadateSomeData(req, res, id);
      });
    }

    //DELETE DATA
  } else if (req.method === "DELETE" && pathname.startsWith("/deleteTask")) {
    const id = pathname.split("/")[2];
    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid ID" }));
    } else {
      console.log("delete data sucessfull this id ", id);
      deleteData(req, res, id);
    }

    //NON OF THIS CASE RUNING
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

module.exports = TaskRoute;
