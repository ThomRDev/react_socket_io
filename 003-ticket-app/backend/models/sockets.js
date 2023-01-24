const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log(socket.id + " conectado");

      socket.on("request-ticket", (payload, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on("next-ticket", (user, callback) => {
        const { agent, desktop } = user;
        const hisTicket = this.ticketList.assignTicket(agent, desktop);
        callback(hisTicket);
        this.io.emit("assigned-ticket", this.ticketList.last13);
      });

      socket.on("disconnect", () => {
        console.log(socket.id + " desconectado");
      });
    });
  }
}

module.exports = Sockets;
