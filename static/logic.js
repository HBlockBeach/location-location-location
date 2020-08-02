// logic.js - accessToken: API_KEY - will need to be updated for individual user
var mymap = L.map('map').setView([37.09, -95.71], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

// Turn off for AWS deployment
var zillowdata = "http://127.0.0.1:5000/data";

// Turn on for AWS deployment
//var zillowdata = "http://ec2-18-191-1-190.us-east-2.compute.amazonaws.com:8080/data";

//console.log("before d3.json")

// Create icon for map
var cIcon = L.icon({
  iconUrl: "static/img/house.png",
  iconSize:     [18, 18], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

function layer(){
    d3.json(zillowdata).then(function(housing_data) {
    //console.log("In d3.json call")
    //console.log(zillowdata);

    //console.log(housing_data[885]);

    for (var i = 0; i < 25; i++) {
        var marker = L.marker([housing_data[i][20], housing_data[i][21]], {icon: cIcon}).addTo(mymap)
        .bindPopup("<p>Metropolitan Area: " + (housing_data[i][1]) + "<br>" + "The median housing price is $" + (housing_data[i][18]));
    }
})};

layer()

function createchart2(yearinput){
  d3.json(zillowdata).then(function(yearData) {
      var dataForInput = yearData.filter(row => row[1].trim() == yearinput);
        //console.log(dataForInput)
        lat = dataForInput.map(row => row[20]);
        lng = dataForInput.map(row => row[21]);
        city = dataForInput.map(row => row[1]);
        medianvalue =dataForInput.map(row=>row[19])

        newlat= parseFloat(lat)
        newlng = parseFloat(lng)
          

        var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
          
        newmedian = formatter.format(medianvalue);

        //console.log(newmedian)
        //console.log(newlat)
        //console.log(newlng)
        //console.log(city)
          
        var marker = L.marker([newlat, newlng], {icon: cIcon}).addTo(mymap)
        .bindPopup("<p>Metropolitan Area: " + city + "<br>" + "\n" + "The median house price is " + newmedian).openPopup();
})};

function medianvalue(input){
  d3.json(zillowdata).then(function(update) {
  var dataForInput = update.filter(row => row[1].trim() == input);
 
  medianvalues =dataForInput.map(row=>row[19])
  //console.log(medianvalues);

})};

d3.selectAll("#dropdown").on("change", updatePage);

function updatePage() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#dropdown").node();
  // Assign the dropdown menu item ID to a variable
  var dropdownMenuID = dropdownMenu.id;
  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;
  //console.log(dropdownMenuID);
  //console.log(selectedOption);
  createchart2(selectedOption)
  medianvalue(selectedOption)
};


