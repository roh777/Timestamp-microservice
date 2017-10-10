// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' '+day+', '+year;
}

function myDate(d) {
  
  this.unix = d.getTime() / 1000;
  this.natural = formatDate(d);
}


app.get('/:timestamp', function(req, res) {
  var timestamp = req.params.timestamp;
  var d;
  
  if(timestamp.indexOf(' ') === -1){ //means date is in unix format
    d = new Date(parseInt(timestamp) * 1000);
  }else {
    d = new Date(timestamp);
  }
  
  var result = new myDate(d);
  res.send(result);
  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
