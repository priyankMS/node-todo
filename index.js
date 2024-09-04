const fs = require("node:fs");
const path = require("path");
const filePath = path.resolve(__dirname, "file.txt");

const EventEmmiter = require("node:events");

const emitter = new EventEmmiter();

let http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});
server.listen('8000', (req, res) => {
    console.log("server is on");
})
