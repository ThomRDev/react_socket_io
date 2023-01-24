class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log(socket.id + " conectado");
      socket.on("send-message", (data) => {
        this.io.emit("send-message", data);
      });
      socket.on("disconnect", () => {
        console.log(socket.id + " desconectado");
      });
    });
  }
}

module.exports = Sockets;
