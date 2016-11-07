const express = require('express'),
    cheerio = require('./modules/cheerio.js');


var app = express();

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.post('/parse', function(req,res){
    console.log(req.query.url);
    cheerio(req.query.url).then(function(results){
        res.json({
            success: true,
            info: results
        });
    });
});

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
