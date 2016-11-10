const express = require('express'),
    util = require('util'),
    parser = require('body-parser'),
    user = require('./modules/user-handlers.js'),
    link = require('./modules/link-handlers.js'),
    check_inputs = require('./modules/check-inputs.js'),
    chalk = require('chalk'),
    green = chalk.green,
    blue = chalk.blue,
    error = chalk.bold.magenta,
    property = chalk.cyan;

var app = express();

app.use(parser.json());
app.use(function logUrl(req, res, next) {
    next();
});

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', function(req, res) {
    //handle passport registration
    //console.log("serverside");
    check_inputs.register(req.body.user).catch(function(error_field){
        console.log(error("input " + error_field + " not correct"));
        //make sure an error message shows up.
        throw error_field;
    }).then(function(){
        console.log(green("correct"));
        user.check_for_user(req.body.user.username).then(function(exists){
            if (exists) {
                console.log(blue("username exists: " + exists));
                //message "that username has already been registered. try logging in."
            } else {
                console.log(blue("Adding user to database"));
                user.unique_register(req,res);
            }
        }).catch(function(err){
            console.log(error("Error in Register Post"));
            throw err;
            //message
        });
    });
});

app.post('/parse', function(req,res){
    link.parse(req,res);
});

app.post('/save/link', function(req,res){
    link.upload(req,res);
});

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
