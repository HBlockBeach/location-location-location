// charts.js
// Turn off for AWS deployment
var  chartdata = "http://127.0.0.1:5000/data";

// Turn on for AWS deployment
//var chartdata = "http://ec2-18-191-1-190.us-east-2.compute.amazonaws.com:8080/data";

// Build bar chart for turnout %
function createchart(chartsinput){
  d3.json(chartdata).then(function(charts) {
    //console.log(charts)
    var dataForInput = charts.filter(row => row[1].trim() == chartsinput);
    x= ["1/2019", "2/2019", "3/2019", "4/2019", "5/2019" , "6/2019", "7/2019", "8/2019", "9/2019", "10/2019", "11/2019", "12/2019", "1/2020", "2/2020", "3/2020", "4/2020", "5/2020"]
    datalist = []

    for (let [key, value] of Object.entries(dataForInput)) {
      datalist.push(value[3]);
      datalist.push(value[4])
      datalist.push(value[5])
      datalist.push(value[6])
      datalist.push(value[7])
      datalist.push(value[8])
      datalist.push(value[9])
      datalist.push(value[10])
      datalist.push(value[11])
      datalist.push(value[12])
      datalist.push(value[13])
      datalist.push(value[14])
      datalist.push(value[15])
      datalist.push(value[16])
      datalist.push(value[17])
      datalist.push(value[18])
      datalist.push(value[19])
    };
  
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

   var perc_change = Math.round((datalist[16] - datalist[0])/datalist[0] *100)
   console.log(perc_change)

    y=datalist

    var trace1 = [{
    type: "line",
    x: x,
    y: y
  }]

  var layout = {
    title: "Housing Price" + "<br>" + "Percent Change: "+ perc_change + "%"
  };

    Plotly.newPlot("chart", trace1, layout);
  
   });
  };

// Turn off for AWS deployment
var  rentaldata = "http://127.0.0.1:5000/rentals";

// Turn on for AWS deployment
//var rentaldata = "http://ec2-18-191-1-190.us-east-2.compute.amazonaws.com:8080/rentals";

  function createchart2(chartsinput){
    d3.json(rentaldata).then(function(charts) {
      //console.log(charts)
      var dataForInput = charts.filter(row => row[1].trim() == chartsinput);
      x= ["1/2019", "2/2019", "3/2019", "4/2019", "5/2019" , "6/2019", "7/2019", "8/2019", "9/2019", "10/2019", "11/2019", "12/2019", "1/2020", "2/2020", "3/2020", "4/2020", "5/2020"]
      datalist = []

      for (let [key, value] of Object.entries(dataForInput)) {
        datalist.push(value[2]);
        datalist.push(value[3])
        datalist.push(value[4])
        datalist.push(value[5])
        datalist.push(value[6])
        datalist.push(value[7])
        datalist.push(value[8])
        datalist.push(value[9])
        datalist.push(value[10])
        datalist.push(value[11])
        datalist.push(value[12])
        datalist.push(value[13])
        datalist.push(value[14])
        datalist.push(value[15])
        datalist.push(value[16])
        datalist.push(value[17])
        datalist.push(value[18])
      };
      
      var perc_change = Math.round((datalist[16] - datalist[0])/datalist[0] *100)

      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
  
      var datalist2 = []
      var i
      for (i=0; i<datalist.length; i++){
        //console.log(datalist[i])
        currency = formatter.format(datalist[i])
        datalist2.push(currency)
      }

      y=datalist2
  
      var trace1 = [{
      type: "line",
      x: x,
      y: y
      }];

      var layout2 = {
        title: "Rental Prices" + "<br>" + "Percent Change: "+ perc_change + "%"
      };
  
      Plotly.newPlot("chart2", trace1, layout2);
    
     });
    }; 
  d3.selectAll("#city").on("change", newchart);

  function newchart() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#city").node();
    // Assign the dropdown menu item ID to a variable
    var dropdownMenuID = dropdownMenu.id;
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
    //console.log(dropdownMenuID);
    //console.log(selectedOption);
    createchart(selectedOption)
    createchart2(selectedOption);}

   
    createchart("New York, NY")
    createchart2("New York, NY")

    //document.getElementById('filter-btn').onclick = newchart();
  
d3.json(chartdata).then(function(data){

  //console.log(data)
  dropdown= document.getElementById("city")

  states = []
  var i

  for (i=0; i< data.length; i++){
    //console.log(data[i][2])
    if(!(data[i][2] in states)){
      states.push((data[i][2]).trim())
    }
  }

  console.log(states)
  





  });