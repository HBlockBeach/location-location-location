var mymap = L.map('map').setView([37.09, -95.71], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapkey
}).addTo(mymap);


let data = d3.csv("../realestate_data/zillow_for_lat_lon.ipynb").then(function(data){
    console.log(data)
})


//var i;
//for (i = 0; i < data.length; i++) {
  //  var marker = L.marker([51.5, -0.09]).addTo(mymap);

//}
//var marker = L.marker([51.5, -0.09]).addTo(mymap);