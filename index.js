const express = require('express');
const cheerio = require('cheerio');
var request = require('request');

var app = express();

app.get('/', function(req, res){
    request('https://www.reddit.com', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            ($('.entry').find('.outbound').each(function(){
                console.log($(this).attr('href'));
            }));
        } else {
            console.log("error");
        }
    });

});

app.use(express.static(__dirname + '/'));

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
