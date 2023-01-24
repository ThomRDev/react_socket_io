const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [new Band("The beatles"), new Band("Dayglow")];
  }

  addBand(name) {
    this.bands.push(new Band(name));
    return this.bands;
  }
  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id != id);
  }
  getBands() {
    return this.bands;
  }

  increaseVotes(id) {
    this.bands = this.bands.map((band) =>
      band.id == id ? { ...band, votes: band.votes + 1 } : band
    );
  }

  changeBandName(id, newName) {
    this.bands = this.bands.map((band) =>
      band.id == id ? { ...band, name: newName } : band
    );
  }
}

module.exports = BandList;
