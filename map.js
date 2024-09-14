const defaultRadius = 10;

function initMap() {
    // Initialize the map and set its view to a specified location and zoom level
    var map = L.map('map');
    map.locate({ setView: true, watch: true, maxZoom: 16 }); //prompts browser
    populateMap(map);
}

function populateMap(map) {
    map.on('locationfound', function (e) {
        var lat = e.latlng.lat; // Latitude
        var lng = e.latlng.lng; // Longitude

        // Log lat and lng in the console
        console.log('Latitude: ' + lat + ', Longitude: ' + lng);

        // Add a marker at the user's location
        addMarker(map, lat, lng, "You are here!");
        addCircle(map, lat, lng, 500);
    });

    // Add the OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Handle location error
    map.on('locationerror', function (e) {
        alert(e.message);
    });
}

function addMarker(map, latitude, longitude, popupContent) {
    const marker = L.marker([latitude, longitude]).addTo(map);
    if(popupContent) {
        marker.bindPopup(popupContent).openPopup();
    }
    return marker;
}

function addCircle(map, latitude, longitude, radius) {
    const circle = L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: radius
    }).addTo(map);

    return circle;
}