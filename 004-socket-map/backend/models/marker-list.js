class MarkerList {
  constructor() {
    this.activeMarkers = {
      abc: {
        lat: -12.151808640355611,
        lng: -76.95559602050712,
        id: "abc",
      },
    };
  }

  addMarker(marker) {
    this.activeMarkers[marker.id] = marker;
    return marker;
  }

  removeMarker(id) {
    delete this.activeMarkers[id];
  }

  updateMarker(marker) {
    this.activeMarkers[marker.id] = marker;
  }
}

module.exports = MarkerList;
