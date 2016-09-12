var express = require('express');
var app = express();
//var rsj = require('rsj');
//var Promise =require('es6-promise').Promise
var  firebase = require ("firebase");
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




  //import Vue from 'vue'
  //import VueFire from "vuefire"
//   var FeedMe = require('feedme')
//   , parser = new FeedMe()
//   , fs = require('fs')
 
// parser.on('title', function(title) {
//   console.log('title of feed is', title);
// });
 
// parser.on('item', function(item) {
//   console.log(item);
// });
 
// // sax-js and clarinet allow streaming 
// // which means faster parsing for larger feeds! 
// fs.createReadStream('http://www.mp4ba.com/rss.php').pipe(parser);

firebase.initializeApp({
  serviceAccount: "./yuxizhe2008-1c6760c143d0.json",
  databaseURL: "https://yuxizhe2008.firebaseio.com"
});

function firebaseData(id){
    return firebase.database().ref('/'+id);
  };

  // function request(url) {
  //     return new Promise(function (resolve) {
  //       var xhr = new XMLHttpRequest()
  //       xhr.open('GET', url)
  //       xhr.send()
  //       xhr.addEventListener('load', function () {
  //         resolve(JSON.parse(this.response))
  //       })
  //     })
  //   };

  //   request('http://www.mp4ba.com/rss.php').then(
  //         function(result){
  //               console.log(result);
  //         }
  //     );

//sj = require('rsj');//RSS as JSON when use it we must (npm install rsj) first

// rsj.r2j('http://www.mp4ba.com/rss.php',function(json) {
//     var obj = eval('(' + json + ')');//js原生方法
//     //var obj = JSON.parse(json);//json.js包


//     // for(var a =0;a<5;a++){
//     //     console.log(obj[a]);
//     // };
    
//     firebaseData('rss').push(obj[1]);
//     //res.render('index', { title: 'testbook',layout:'layout',nav:'index',rssData:obj});
// });

download(url, function(data) {
  if (data) {
      parseString(data, function (err, result) {
      firebaseData('rss').push(result);
      });

  }
  else
   console.log("error");
});

function settime(){
    var time = new Date();
    firebaseData('time').push({a:time.toLocaleString()});
}

setInterval(settime,600000);

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  // response.send($.html());
  // console.log($.html());
  download(url, function(data) {
      if (data) {
        //response.send(data);
        var $ = cheerio.load(data);
        $('item>title').each(function(){
             console.log($(this).text());
             });

      }
      else console.log("error");
    });
      
}
);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


