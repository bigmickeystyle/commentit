const express = require('express'),
    util = require('util'),
    parser = require('body-parser'),
    user = require('./modules/user-handlers.js'),
    link = require('./modules/link-handlers.js'),
    check_inputs = require('./modules/check-inputs.js'),
    cheerio = require('./modules/cheerio.js'),
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
        user.check_for_user(req.body.user.username).catch(function(err){
            console.log(error("Error in Register Post"));
            throw err;
            //message
        }).then(function(exists){
            if (exists) {
                console.log(blue("username exists: " + exists));
                //message "that username has already been registered. try logging in."
            } else {
                console.log(blue("Adding user to database"));
                user.unique_register(req.body.user).catch(function(err){
                    console.log(error("error putting info in database"));
                    throw err;
                }).then(function(){
                    console.log(property("Success!"));
                    res.json({
                        success: true
                    });
                });
            }
        });
    });
});
app.get('/profile', function(req,res){
    user.get_profile(req.query.username).catch(function(err){
        console.log(error("error getting profile info from database"));
        throw err;
    }).then(function(info){
        console.log(blue("Info got"));
        res.json({
            success: true,
            info: info
        });
    });
});
app.post('/profile', function(req,res){
    check_inputs.profile(req.body.info).catch(function(error_field){
        console.log(error("input " + error_field + " not correct"));
        //make sure an error message shows up.
        throw error_field;
    }).then(function(){
        user.edit_profile(req.body.info).catch(function(err){
            console.log(error("error saving to the database"));
            throw err;
            //give message about error
        }).then(function(){
            res.json({success:true});
        });
    });
});

app.post('/parse', function(req,res){
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

app.post('/save/link', function(req,res){
    link.upload(req,res).catch(function(error){
        console.log(error("error saving to database"));
        //show this in a message
        throw error;
    }).then(function(){
        res.json({success:true});
    });
});

app.listen(8080, function(){
    console.log("I'm so turned on right now");
});
