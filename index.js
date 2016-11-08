const express = require('express'),
    cheerio = require('./modules/cheerio.js'),
    util = require('util'),
    dbconnect = require('./modules/dbconnect.js');


var app = express();

app.use(function logUrl(req, res, next) {
    console.log('requesting: ' + req.url);
    next();
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/parse', function(req,res){
    console.log(req.query.url);
    cheerio(req.query.url).then(function(results){
        res.json({
            success: true,
            info: results
        });
    }).catch(function(error){
        res.json({
            success: false,
            info: error
        });
    });
});
//
//
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.post('/save/link', function(req,res){
    var tags = req.query.tags;
    if (tags) {
        if (tags.search(",") == -1) {
            req.query.tags = [tags];
        } else {
            tags = tags.split(",");
            req.query.tags = tags.map(function(elem){
                return elem.trim();
            });
        }
    } else {
        req.query.tags = [];
    }
    var data = req.query;
    //db save stuff
    //need to handle saving the username, once user is handled
    var call = 'INSERT INTO links (url, username, siteName, siteType, headline, description, image, thumbnail, tags)\
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
    var params = [data.url, data.username, data.siteName, data.type, data.title, data.description, data.image, data.thumbnail, data.tags];
    dbconnect.pgConnect(call, params).then(function(){
        res.json({success: true});
        //handle errors in database by sending with a message
    });
});

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
