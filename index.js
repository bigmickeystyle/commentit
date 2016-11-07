const express = require('express');

var app = express();

app.use(express.static(__dirname + '/'));

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
