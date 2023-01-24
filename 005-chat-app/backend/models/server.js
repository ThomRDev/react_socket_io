const socket = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");
const Sockets = require("./sockets");
const path = require("path");
const AuthRouter = require("./../router/auth");
const MessageRouter = require("./../router/message");

const { dbConnection } = require("./../database/config");

require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.port = process.env.PORT;
    // this.io = socket(this.httpServer)

    dbConnection();

    this.io = new socket.Server(this.httpServer);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/messages", MessageRouter);
  }

  socketsConfigurations() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.socketsConfigurations();
    this.httpServer.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
