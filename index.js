const express = require('express'),
    cheerio = require('cheerio.js');


var app = express();

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.post('/parse', function(req,res){
    console.log("parsing scenario entered");

});

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
