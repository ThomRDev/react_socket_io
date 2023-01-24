const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log(socket.id + " conectado");

      socket.emit("current-bands", this.bandList.getBands());

      socket.on("vote", (data) => {
        this.bandList.increaseVotes(data);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("change-name", (data) => {
        this.bandList.changeBandName(data.id, data.name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("remove", (data) => {
        this.bandList.removeBand(data);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("add-band", (data) => {
        this.bandList.addBand(data);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("disconnect", () => {
        console.log(socket.id + " desconectado");
      });
    });
  }
}

module.exports = Sockets;
