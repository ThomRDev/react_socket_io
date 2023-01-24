const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pendingTickets = [];
    this.assignedTickets = [];
  }

  get nextNumber() {
    return ++this.lastNumber;
  }

  get last13() {
    return this.assignedTickets.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pendingTickets.push(newTicket);
    return newTicket;
  }

  assignTicket(agent, desktop) {
    // no puedo asignar nada si no hay ningun ticket pendiente
    if (this.pendingTickets.length == 0) {
      return null;
    }
    const nextTicket = this.pendingTickets.shift();
    nextTicket.desktop = desktop;
    nextTicket.agent = agent;

    this.assignedTickets.unshift(nextTicket);
    return nextTicket;
  }
}

module.exports = TicketList;
