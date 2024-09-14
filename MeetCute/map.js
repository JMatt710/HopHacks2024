class MapController {
    constructor() {
      this.map = L.map('map');
      this.initMap();
    }
  
    initMap() {
      this.map.locate({ setView: true, watch: true, maxZoom: 16 }); //prompts browser
      this.populateMap();
    }
  
    populateMap() {
      this.map.on('locationfound', (e) => {
        var lat = e.latlng.lat; // Latitude
        var lng = e.latlng.lng; // Longitude
  
        // Log lat and lng in the console
        console.log('Latitude: ' + lat + ', Longitude: ' + lng);
  
        // Add a marker at the user's location
        this.addMarker(lat, lng, "You are here!");
        this.addCircle(lat, lng, 500);
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
  
    addMarker(latitude, longitude, popupContent) {
      const marker = L.marker([latitude, longitude]).addTo(this.map);
      if(popupContent) {
        marker.bindPopup(popupContent).openPopup();
      }
      return marker;
    }
  
    addCircle(latitude, longitude, radius) {
      const circle = L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: radius
      }).addTo(this.map);
  
      return circle;
    }
}