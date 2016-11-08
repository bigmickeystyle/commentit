const express = require('express'),
    cheerio = require('./modules/cheerio.js'),
    util = require('util');


var app = express();

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));


app.get('/', function(req,res){
    console.log("started");
});
app.post('/parse', function(req,res){
    console.log(req.query.url);
    cheerio(req.query.url).then(function(results){
        var tags = req.query.tags;
        if (tags) {
            if (tags.search(",") == -1) {
                results.tags = [tags];
            } else {
                tags = tags.split(",");
                results.tags = tags.map(function(elem){
                    return elem.trim();
                });
            }
        } else {
            results.tags = [];
        }
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

app.post('/save/link', function(req,res){
    console.log("Submitted in Node");
    //db save stuff
});

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
