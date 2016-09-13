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
  serviceAccount: "./yuxizhe2008-web.json",
  databaseURL: "https://yuxizhe2008.firebaseio.com"
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
  };

 
function settime(){
    var time = new Date();
    firebaseData('time').push({a:time.toLocaleString()});
    console.log('1');

    // download(url, function(data) {
    //   if (data) {
    //     //console.log(data)
    //       parseString(data, function (err, result) {
    //       //firebase("rss").remove();
    //       if(result){
    //                    var blog;
    //           for(blog =0; blog<20;blog++){
    //           var text = result.rss.channel[0].item[blog];
    //           firebaseData('rss').push({title:text.title,
    //                                       //description:text.description
    //                                       //category:text.category
    //                                       });
    //             console.log(text.title);
    //               }
    //            }
    //      });
    //   }
    //   else
    //    console.log("error");
    // });
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


