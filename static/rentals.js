// rentals.js - accessToken: API_KEY - will need to be updated for individual user
var thismap = L.map('map2').setView([37.09, -95.71], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(thismap);

// // Turn off for AWS deployment
var rental = "http://127.0.0.1:5000/rentals";

// // Turn on for AWS deployment
//var rental = "http://ec2-18-191-1-190.us-east-2.compute.amazonaws.com:8080/rentals";

// Create icon for map
var aIcon = L.icon({
  iconUrl: "static/img/apartment.png",
  iconSize:     [15, 15], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

function layer(){
    d3.json(rental).then(function(housing_data) {

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      });

    for (var i = 0; i < 107; i++) {
        var marker = L.marker([housing_data[i][19], housing_data[i][20]], {icon: aIcon}).addTo(thismap)
        .bindPopup("<p>Metropolitan Area: " + (housing_data[i][1])+ "<br>" + "The median rental price is $" + (housing_data[i][18]));
    }
})};

layer()

function updatechoice(yearinput){
  d3.json(rental).then(function(yearData) {
    var dataForInput = yearData.filter(row => row[1].trim() == yearinput);
      console.log(dataForInput)
      rlat = dataForInput.map(row => row[19]);
      rlng = dataForInput.map(row => row[20]);
      rcity = dataForInput.map(row => row[1]);
      rmedianvalue =dataForInput.map(row=>row[18])
      
      newlat= parseFloat(rlat)
      newlng = parseFloat(rlng)
          

      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
          
      newmedian = formatter.format(rmedianvalue);

      console.log(newmedian)
      console.log(newlat)
      console.log(newlng)
      console.log(rcity)
          
      var marker = L.marker([newlat, newlng], {icon: aIcon}).addTo(thismap)
      .bindPopup("<p>Metropolitan Area: " + rcity + "<br>" + "\n" + "The median rental price is " + newmedian).openPopup();
})};

function newvalue(input){
  d3.json(rental).then(function(update) {
  var dataForInput = update.filter(row => row[1].trim() == input);
 
  medianvalues =dataForInput.map(row=>row[18])
  console.log(medianvalues);
})};

d3.selectAll("#city").on("change", newMarker);
function newMarker() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#city").node();
  // Assign the dropdown menu item ID to a variable
  var dropdownMenuID = dropdownMenu.id;
  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;
  console.log(dropdownMenuID);
  console.log(selectedOption);
  updatechoice(selectedOption)
  newvalue(selectedOption)
};



