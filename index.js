var express = require('express');
var app = express();
var http = require("http");
var firebase = require("firebase");
//var wilddog = require("wilddog");
var parseString = require('xml2js').parseString;
var os = require("os");



// var config = {
//   syncDomain: "yuxizhe.wilddog.com",
//   syncURL: "https://yuxizhe.wilddogio.com" //输入节点 URL
// };
// wilddog.initializeApp(config);




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

var urlMp4ba = 'http://www.mp4ba.com/rss.php';
var urlSMZDM = 'http://feed.smzdm.com';

 //好像是因为 服务器端的firebase 需要google身份认证 所以会被墙。暂时用 wilddog
firebase.initializeApp({
  serviceAccount: "./yuxizhe2008-pc.json",
  databaseURL: "https://yuxizhe2008.firebaseio.com",
  // databaseAuthVariableOverride: {
  //   uid: "Hnf05yonavgUwYBSUysBXGHIgdt1"
  // }
});
// firebase.initializeApp({
//   serviceAccount: {
//     projectId: "yuxizhe2008",
//     clientEmail: "foo@yuxizhe2008.iam.gserviceaccount.com",
//    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDpR7DR56I+Yt2H\nqS6PlRJeeQoGZe5g/20Jnls4hKAMAGoy1oaGHDFaZxkoXMjDx2eQrLAUFb2YmahT\nQM70taNy9/KoCdMo96usizKvhMIgKDMGDdXIWbdiW2t+aNJ/SQiyHtW/KCRWSJ6A\nP3AqaR8Lk2tqafzewO2Pn6jFOlZvJHR3AyBTFdQN98oL7tJGOC5G/LvFCud02ine\no8hF3Oo78sKlwuDXQGMEKJa1c3euu06Jtq4T+hG4T1W4IeIu5L1BNMlVpsGKrPcN\nfYoDLQLYlTdXNB19P0+w8bki0iNEKtwEZogPP/S+o2oVeGF/2Ac09TZvok9kOSyz\nvp6CHHqHAgMBAAECggEBANyUZlTEkvwsnc5WIemwipL8HoeYQIRFYcPzkcvqVC+l\nAMYbZU5QQDZ8QCSTP18oIPyC3WfQettdh/VY1Zg8XFYsr61GxPz628CmSoH+pVSk\nzkJOOLReaPG/AfCgi1HCLE/IqlI7Uciol/8qfRQNHEbk2W/g0jOK99aToJEFrY8e\nee5qg+mt54GiEI5oF5XDakTur6C0UG5rJz673xCekTHVtyP5pEqM85LyfducEjTi\nhJ9C/uaFxAZdjjqUd1s/UyOst3DSBiWhW8TqYbC9tFWUjEKEmJaEVOZXILig4FrJ\nCd/3hmLNPN+LUp27QRIBpioZovgiQ6BFRQfdgY9RJNECgYEA/ZQsfvCes8Gl9Puv\nI6/flWAGfpMMnyexb43KlTNB4THnA5gUdOB0iJ8XexH/Uae+Vf6LQPwTuwQ83ELG\nvHDmyuB/iNRp+6T65iMZqC4fhJE1EpCwwPQ1n9uf2SY7Grvb1BGCJoO0YcNTZFqH\nB8DZRKkn3GWx1U9HkrfxWRH6UR8CgYEA64HmfQN9/cSn+z26vkgsXp6F9BgJsBV9\neXqMGPdbwHVUs5uBx62BZ/SeOiE0YbWee3ivPqMT7E+Bpvhc2HeO3kSAYKi5ge4C\nZuHyEWKCFK/QeAd4mojLYDMQBVdQjo8eiIqldoRv6NbVjRspJFFIWcH5XCnEvOEj\n5Xh41o5TIZkCgYEAiQSLlnvGBTNZzSpB1HKvyTL9z179rvHvumtPT5dGvbwNK6/9\nPboavcfZFDMBVsng2u6TqCWNM7xydkHOyPvoeS8dOn4sVkErITdOIcXqWeNsXf+4\nwkoyv5IYqWky/psLiWd8f/sieMDmSo9v7wyRWbxdQYXhtXUFI44o5wwDydkCgYBa\nNSyjMAY/gOdTHgb8wcp1B8WJhPeZAfJI6L7nBUCYzJiAH42rfXM27YT6ASP+VUH6\nS3TcyjxkZOPln/Z4V/taeeSuoZJFCXTUEbHWJORsphd1Em+IyeMU2xpE4XgS0xE/\n/dN5PStchYXRAdlVduj+sIUiX0Fjk91bFTU8AdIn6QKBgQD630YpeGVTT8knDFoB\n9nsmw8XtHFs+TRrqs+NN7uP/lkWpHiNs9FNKBTQdu1k4qMCm+AJy3VtfFG1YvMvH\nx+DDsTOl5FiunkIMUzdPSSbT3ON3LctvgQTDFJNIcqKowOds/MhloEqpRJdC4frw\n+7/MKNgI3GmvpPreWMlTH4AMJw==\n-----END PRIVATE KEY-----\n",
//  },
//   databaseURL: "https://yuxizhe2008.firebaseio.com"
// });

function firebaseData(id){
    return firebase.database().ref('/'+id);
      //return wilddog.sync().ref('/'+id);
  };


    var showMem = function() {
     var mem = process.memoryUsage();
     var format = function(bytes) {
          return (bytes/1024/1024).toFixed(2)+'MB';
     };
     console.log('Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
     console.log('----------------------------------------');

};

 
function settime(){
    var time = new Date();
    firebaseData('time').push({time:time.toLocaleString()},function(error) {
    if (error) {
      console.log("Data could not be saved." + error);
    } else {
      console.log("Data saved successfully.");
    }});
    // MP4 
    download(urlMp4ba, function(data) {
      if (data) {
        //console.log(data)
          parseString(data, function (err, result) {
          //firebase("rss").remove();
          if(result){
              var blog;
              var blogs = new Array();
              for(blog in result.rss.channel[0].item){
              var text = result.rss.channel[0].item[blog];

              blogs.push({title:text.title[0],
                          description:text.description[0],
                          //likes:0
                          //category:text.category
                          });
                  };
                firebaseData('rss').set(blogs);
               }
         });
      }
      else
       console.log("error");
    });
    showMem();
};

function downloadSMZDM() {
   // SMZDM 
    download(urlSMZDM, function(data) {
      if (data) {
        //console.log(data)
          parseString(data, function (err, result) {
          //firebase("rss").remove();
          if(result){
              var blog;
              var blogs = new Array();
              for(blog in result.rss.channel[0].item){
              var text = result.rss.channel[0].item[blog];

              blogs.push({title:text.title[0],
                          description:text.description[0],
                          focus_pic:text.focus_pic[0]
                          //content:text.content[0]
                          //likes:0
                          //category:text.category
                          });
              };
              firebaseData('SMZDM').set(blogs,function(error) {
                  if (error) {
                    console.log("SMZDM could not be saved." + error);
                  } else {
                    console.log("SMZDM saved successfully.");
                  }});
            }
         });
      }
      else
       console.log("error");
    });

};

settime();
setInterval(settime,6000);
downloadSMZDM();
setTimeout(function(){setInterval(downloadSMZDM,30000)},30000);

setInterval(function () {
    download('http://yuxizhe.herokuapp.com',function(){console.log('open website , incase of sleep')})}
    ,1600000);

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
     
}
);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


