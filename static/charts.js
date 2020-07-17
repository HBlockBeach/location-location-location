
// Turn off for AWS deployment
var  chartdata = "http://127.0.0.1:5000/data";

// Turn on for AWS deployment
//var chartdata = "http://ec2-18-191-1-190.us-east-2.compute.amazonaws.com:8080/data";
console.log("is this working?")
// Build bar chart for turnout %
d3.json(chartdata).then(function(charts) {
    //console.log(charts)
    var dataForInput = charts.filter(row => row[1].trim() == "New York, NY"); //chartsinput);
    x= ["1/2019", "2/2019", "3/2019", "4/2019", "5/2019" , "6/2019", "7/2019", "8/2019", "9/2019", "10/2019", "11/2019", "12/2019", "1/2020", "2/2020", "3/2020", "4/2020", "5/2020"]
    datalist = []

    // var i;
    // for (i = 0; i < charts.length; i++) {
    //   for(col = 1; col <= col.length; col++);
  
    for (let [key, value] of Object.entries(dataForInput)) {
      console.log(value[2])
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
  
    y=datalist

    var trace1 = [{
    type: "line",
    x: x,
    y: y
  }]

    Plotly.newPlot("chart", trace1);
  
   });

//   totalVotes = turnoutData.map(row => row[2]);
//   eligibleVotes = turnoutData.map(row => row[3]);
  
//   var turnoutPercentage = [];
//   for (var i = 0; i < totalVotes.length; i++) {
//     turnoutPercentage.push(totalVotes[i] / eligibleVotes[i]);
//   }
  
//   var trace1 = [{
//     type: "line",
//     x: turnoutData.map(row => row[1]),
//     y: turnoutPercentage 
//   }]

//   var layout = {
//     xaxis: {
//       title: "Year",
//       range: [1972,2020],
//       tickangle: -45,
//       tickmode: 'linear',
//       tick0: 1972,
//       dtick: 4 
//     },
//     yaxis: {
//       title: "Voter Turnout (%)",
//       showgrid: true,
//       tickformat: ',.0%',
//       range: [0.45, 0.65]
//     }
//   }

//   Plotly.newPlot("bar", trace1, layout);
// });