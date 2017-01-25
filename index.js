var express = require('express');
var app = express();
var http = require("http");
var firebase = require("firebase");
var wilddog = require("wilddog");
var parseString = require('xml2js').parseString;
var os = require("os");
var compression = require('compression');

// firebase 0    wilddog 1
var env = 0;

if (env) {
    var config = {
        syncDomain: "yuxizhe.wilddog.com",
        syncURL: "https://yuxizhe.wilddogio.com" //输入节点 URL
    };
    wilddog.initializeApp(config);

    function firebaseData(id) {
        // return firebase.database().ref('/'+id);
        return wilddog.sync().ref('/' + id);
    };
} else {
    // 好像是因为 服务器端的firebase 需要google身份认证 所以会被墙。暂时用 wilddog
    firebase.initializeApp({
        serviceAccount: "./yuxizhe2008-pc.json",
        databaseURL: "https://yuxizhe2008.firebaseio.com",
    });

    function firebaseData(id) {
        return firebase.database().ref('/' + id);
    };

}



function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
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




var showMem = function() {
    var mem = process.memoryUsage();
    var format = function(bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    };
    console.log('Process: heapTotal ' + format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('----------------------------------------');
};


function settime() {
    var time = new Date();
    firebaseData('time').push({ time: time.toLocaleString() }, function(error) {
        if (error) {
            console.log("Data could not be saved." + error);
        } else {
            console.log("Data saved successfully.");
        }
    });
    // MP4 
    download(urlMp4ba, function(data) {
        if (data) {
            //console.log(data)
            parseString(data, function(err, result) {
                //firebase("rss").remove();
                if (result) {
                    var blog;
                    var blogs = new Array();
                    for (blog in result.rss.channel[0].item) {
                        var text = result.rss.channel[0].item[blog];

                        blogs.push({
                            title: text.title[0],
                            //description: text.description[0],
                            //likes:0
                            //category:text.category
                        });
                    };
                    firebaseData('rss').set(blogs);
                }
            });
        } else
            console.log("error");
    });
    showMem();
};

function downloadSMZDM() {
    // SMZDM 
    download(urlSMZDM, function(data) {
        if (data) {
            //console.log(data)
            parseString(data, function(err, result) {
                //firebase("rss").remove();
                if (result) {
                    var blog;
                    var blogs = new Array();
                    for (blog in result.rss.channel[0].item) {
                        var text = result.rss.channel[0].item[blog];

                        blogs.push({
                            title: text.title[0],
                            description: text.description[0],
                            focus_pic: text.focus_pic[0]
                                //content:text.content[0]
                                //likes:0
                                //category:text.category
                        });
                    };
                    firebaseData('SMZDM').set(blogs, function(error) {
                        if (error) {
                            console.log("SMZDM could not be saved." + error);
                        } else {
                            console.log("SMZDM saved successfully.");
                        }
                    });
                }
            });
        } else
            console.log("error");
    });

};

settime();
setInterval(settime, 600000);
downloadSMZDM();
setTimeout(function() { setInterval(downloadSMZDM, 300000) }, 600000);

setInterval(function() {
    download('http://yuxizhe-winds.daoapp.io', function() { console.log('open website , incase of sleep') })
}, 1600000);

app.set('port', (process.env.PORT || 8080));

//app.use(express.compress());
app.use(compression());
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {

});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
