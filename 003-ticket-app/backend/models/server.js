const socket = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");
const Sockets = require("./sockets");
const path = require("path");

require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.port = process.env.PORT;
    // this.io = socket(this.httpServer)
    this.io = new socket.Server(this.httpServer);
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());

    this.app.get("/last", (req, res) => {
      return res.json({
        last: this.sockets.ticketList.last13,
      });
    });
  }

  // socketsConfigurations() {
  // this.sockets = new Sockets(this.io);
  // }

  execute() {
    this.middlewares();
    // this.socketsConfigurations();
    this.httpServer.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
