const express = require('express'),
    cheerio = require('./modules/cheerio.js');


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
    });
});
//
//
// app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
