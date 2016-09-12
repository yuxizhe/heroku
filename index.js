var express = require('express');
var app = express();
//var rsj = require('rsj');
//var Promise =require('es6-promise').Promise
var  firebase = require ("firebase");
  //import Vue from 'vue'
  //import VueFire from "vuefire"

firebase.initializeApp({
  serviceAccount: "./yuxizhe2008-1c6760c143d0.json",
  databaseURL: "https://yuxizhe2008.firebaseio.com"
});
  //Vue.use(VueFire);
  //firebase = new Firebase();
//   var config = {
//     apiKey: "AIzaSyD4az7go2CWyb-Yy_2wHISnfoytLEzUg-4",
//     authDomain: "yuxizhe2008.firebaseapp.com",
//     databaseURL: "https://yuxizhe2008.firebaseio.com",
//     storageBucket: "",
//   };
//   firebase.initializeApp(config);

function firebaseData(id){
    return firebase.database().ref('/'+id);
  };

// rsj.r2j('http://www.mp4ba.com/rss.php',function(json) {
//     //var obj = eval('(' + json + ')');//js原生方法
//     var obj = JSON.parse(json);//json.js包
//     //console.log(obj);
//     firebaseData('rss').push(obj);
//     //res.render('index', { title: 'testbook',layout:'layout',nav:'index',rssData:obj});
// });

firebaseData('rss').push({a:1});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


