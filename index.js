var express = require('express');
var app = express();
//var rsj = require('rsj');
//var Promise =require('es6-promise').Promise
//var  firebase = require ("firebase");
//var cheerio = require('cheerio');
//var $ = cheerio.load('http://www.mp4ba.com/rss.php');
var http = require("http");

var parseString = require('xml2js').parseString;



// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var url = 'http://www.mp4ba.com/rss.php';


// firebase.initializeApp({
//   serviceAccount: "./yuxizhe2008-1c6760c143d0.json",
//   databaseURL: "https://yuxizhe2008.firebaseio.com"
// });

// function firebaseData(id){
//     return firebase.database().ref('/'+id);
//   };

 

download(url, function(data) {
  if (data) {
    console.log(data)
      parseString(data, function (err, result) {
      //firebaseData('rss').push(result);
      console.log(result)
      });

  }
  else
   console.log("error");
});

// function settime(){
//     var time = new Date();
//     firebaseData('time').push({a:time.toLocaleString()});
// }

// setInterval(settime,5000);

app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
  download(url, function(data) {
  if (data) {
    console.log(data)
      parseString(data, function (err, result) {
      //firebaseData('rss').push(result);
      response.send(result)
      });

  }
  else
   console.log("error");
});
      
}
);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


