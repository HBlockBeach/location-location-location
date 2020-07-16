var mymap = L.map('map').setView([37.09, -95.71], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

var zillowdata = "http://127.0.0.1:5000/data";

console.log("before d3.json")

d3.json(zillowdata).then(function(housing_data) {
    console.log("In d3.json call")
    console.log(zillowdata);

    console.log(housing_data[0]);

    for (var i = 0; i < 25; i++) {
        var marker = L.marker([housing_data[i][20], housing_data[i][21]]).addTo(mymap)
        .bindPopup("<p>Metropolitan Area: " + (housing_data[i][1]));
        
    }
});
        
  