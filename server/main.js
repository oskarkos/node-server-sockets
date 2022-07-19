var express = require("express");
const cors = require("cors");
var app = express();
app.use(cors());
const server = require("http").Server(app, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
  },
});
var ioClient = require("socket.io-client");
const io = require("socket.io")(server);

const socketClient = ioClient.connect("http://localhost:5050", {
  forceNew: true,
});

socketClient.on("serialNumber", function (data) {
  console.log("serialNumber: " + data);
  io.sockets.emit("serialNumberOnServer", data);
});

socketClient.on("haveSerial", function (data) {
  console.log(data);
});

server.listen(8080, function () {
  console.log("Server listening at port 8080");
});
