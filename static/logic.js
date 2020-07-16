var mymap = L.map('map').setView([37.09, -95.71], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiYmxvY2toIiwiYSI6ImNrYWVpcTBlZTAyNDcycHJ3cTgyOTMzbzIifQ.Ig5e-_6ao22OX0xPpryIEA"
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

function createchart2(cityinput){
    d3.json(zillowdata).then(function(citydata) {
      //console.log(yearData);
        var dataForInput = citydata.filter(row => row[1] == cityinput);
        var marker = L.marker([citydata[i][20], citydata[i][21]]).addTo(mymap)
      });}
    

d3.selectAll("#city").on("change", updatePage);
    function updatePage() {
  // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selYear").node();
  // Assign the dropdown menu item ID to a variable
    var dropdownMenuID = dropdownMenu.id;
  // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
    console.log(dropdownMenuID);
    console.log(selectedOption);
    createchart(selectedOption);
    createchart2(selectedOption)}
  