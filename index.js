var express = require('express');
var app = express();
var http = require("http");
var firebase = require("firebase");
var parseString = require('xml2js').parseString;


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


firebase.initializeApp({
  serviceAccount: "./yuxizhe2008-f0b5f83f53c2.json",
  databaseURL: "https://yuxizhe2008.firebaseio.com"
});

function firebaseData(id){
    return firebase.database().ref('/'+id);
  };

 
firebaseData('time').push({a:1});
console.log("push");

firebaseData('test').on('value',function(re){
    console.log(re.val())
});
download(url, function(data) {
  if (data) {
    //console.log(data)
      parseString(data, function (err, result) {
      //firebaseData('rss').push({a:2});
      console.log(result.rss.channel[0].item[0])
      });
  }
  else
   console.log("error");
});

function settime(){
    var time = new Date();
    firebaseData('time').push({a:time.toLocaleString()});
    console.log('1');

    download(url, function(data) {
      if (data) {
        //console.log(data)
          parseString(data, function (err, result) {
          //firebase("rss").remove();
          if(result){
                       var blog;
              for(blog =0; blog<20;blog++){
              var text = result.rss.channel[0].item[blog];
              firebaseData('rss').push({title:text.title,
                                          //description:text.description
                                          //category:text.category
                                          });
                console.log(text.title);
                  }
               }
         });
      }
      else
       console.log("error");
    });
}

setInterval(settime,30000);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
      // download(url, function(data) {
      //   if (data) {
      //     //console.log(data)
      //       parseString(data, function (err, result) {
      //       //firebaseData('rss').push(result);
      //       response.send(result.rss.channel[0].item[0])
      //       });

      //   }
      //   else
      //    console.log("error");
      // });
      
}
);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


