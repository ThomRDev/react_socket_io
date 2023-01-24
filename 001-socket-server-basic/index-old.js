// https://github.com/ThomRoman/Node-2022/blob/main/16-chat-typescript/src/models/Server.ts
// const io = require('socket.io')(httpServer)

// const server = require('http').createServer();
// const io = require('socket.io')(server);
// io.on('connection', client => {
//   client.on('event', data => { /* … */ });
//   client.on('disconnect', () => { /* … */ });
// });
// server.listen(3000);

const { createServer } = require("http");

const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

const httpServer = createServer(app);
// https://socket.io/docs/v3/server-initialization/
const io = new socket.Server(httpServer, {
  cors: {
    origin: ["*"],
  },
});

// socket = client que se conecto
io.on("connection", (socket) => {
  console.log("cliente conectado ", socket.id);

  // emite a todos
  // io.emit("message", "hola te veo");

  // solo emite al cliente que se conecto
  // socket.emit()

  socket.on("send-message", (data) => {
    io.emit("send-message", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " desconectado");

    // emite a todos
    // io.emit("user-disconnected",'se desconecto el usuario blablabl')

    // emite a todos menos al que envio
    // socket.broadscast
  });
});

httpServer.listen(3000, () => {
  console.log("listening on port " + 3000);
});
