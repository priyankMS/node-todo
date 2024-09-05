const fs = require("node:fs");
const path = require("path");
const filePath = path.resolve(__dirname, "file.txt");
const TaskRoute  = require('./routes/todo')
const EventEmmiter = require("node:events");

const emitter = new EventEmmiter();

let http = require('http');

const server = http.createServer((req, res) => {
    TaskRoute(req,res)

});
server.listen('3000', (req, res) => {
    console.log("server is on");
})



