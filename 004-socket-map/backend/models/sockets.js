const MarkerList = require("./marker-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.markerList = new MarkerList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log(socket.id + " conectado");

      socket.emit("active-markers", this.markerList.activeMarkers);

      socket.on("new-marker", (marker) => {
        this.markerList.addMarker(marker);
        // a todos menos al que envia
        socket.broadcast.emit("new-marker", marker);
      });

      socket.on("update-marker", (marker) => {
        this.markerList.updateMarker(marker);
        socket.broadcast.emit("update-marker", marker);
      });

      socket.on("disconnect", () => {
        console.log(socket.id + " desconectado");
      });
    });
  }
}

module.exports = Sockets;
