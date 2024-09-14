class MapController {
  constructor() {
    this.map = L.map('map');
    this.initMap();
    this.initial = 1; // Is 1 when first starting up the the website then 0
    //this.startInterval(); // Start the 3-minute interval
  }

  /**
   * Spends 30s trying to get users location and will zoom in on them.
   */
  initMap() {
    this.map.locate({ setView: true, timeout: 30000, maxZoom: 16 }); //prompts browser
    this.populateMap();
  }

  /**
   * If the user location is found, we get the latitude and longitude
   */
  populateMap() {
    this.map.on('locationfound', (e) => {
      var lat = e.latlng.lat; // Latitude
      var lng = e.latlng.lng; // Longitude

      // Log lat and lng in the console
      console.log('Latitude: ' + lat + ', Longitude: ' + lng);

      // Add a marker at the user's location
      if (this.initial) {// Only runs on startup
        this.initAddMarkers(lat, lng, "You are here!", 500);
        this.initial = 0;
      }
      else {// Only runs after startup
        this.addMarker(lat, lng, "You are here!");
        this.addCircle(lat, lng, 500);
      }
    });

    // Add the OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Handle location error
    this.map.on('locationerror', (e) => {
      alert(e.message);
    });
  }

  /**
   * This method is only ran on startup up and adds a pin at the users location
   * as well as a circle which has a radius that is defined by the user.
   * 
   * @param {*} latitude Users latitude
   * @param {*} longitude Users longitude
   * @param {*} popupContent Message for the pin icon
   * @param {*} radius Area around users location
   * @returns the pin icon and circle
   */
  initAddMarkers(latitude, longitude, popupContent, radius) {
    // Adding location pin to the map
    const marker = L.marker([latitude, longitude]).addTo(this.map);
    if (popupContent) {
      marker.bindPopup(popupContent).openPopup();
    }

    // Adding circle around the location pin (users location)
    const circle = L.circle([latitude, longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.1,
      radius: radius
    }).addTo(this.map);

    return marker, circle;
  }

  /**
   * Only runs after initial startup. Deletes the old location pin and adds
   * a new one to the map at an updated latitude and longitude
   * 
   * @param {*} latitude Users latitude
   * @param {*} longitude Users longitude
   * @param {*} popupContent Message for the pin icon
   * @returns location pin
   */
  addMarker(latitude, longitude, popupContent) {
    // Removing old location pin
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Adding location pin in a new location
    const marker = L.marker([latitude, longitude]).addTo(this.map);
    if (popupContent) {
      marker.bindPopup(popupContent).openPopup();
    }

    return marker;
  }

  /**
   * Only runs after initial startup. Deletes the old circle and adds
   * a new one to the map at an updated latitude and longitude
   * 
   * @param {*} latitude Users latitude
   * @param {*} longitude Users longitude
   * @param {*} radius Area around users location
   * @returns Circle surrounding users location
   */
  addCircle(latitude, longitude, radius) {
    // Removing old circle
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Circle) {
        this.map.removeLayer(layer);
      }
    });

    // Adding circle in a new location
    const circle = L.circle([latitude, longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.1,
      radius: radius
    }).addTo(this.map);

    return circle;
  }

  /**
   * This method will re-run map initialization every 3 min. This effectively
   * allows us to update the users location as they are on the move.
   * NOTE: The user will be prompted again (on Chrome) to allow access to their
   * location.
   */
  startInterval() {
    setInterval(() => {
      this.initMap();
    }, 180000);
  }
}
