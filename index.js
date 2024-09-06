const fs = require("node:fs");
const path = require("path");
const filePath = path.resolve(__dirname, "file.txt");
const TaskRoute = require("./routes/todoRoutes");
const EventEmmiter = require("node:events");

const emitter = new EventEmmiter();

let http = require("http");
const port = 3000;
const server = http.createServer((req, res) => {
  TaskRoute(req, res);
});
server.listen(port, (req, res) => {
  console.log(`server is succfully run on ${port}`);
});



