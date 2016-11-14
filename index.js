const express = require('express'),
    util = require('util'),
    parser = require('body-parser'),
    bcrypt = require('./modules/bcrypt.js'),
    user = require('./modules/user-handlers.js'),
    link = require('./modules/link-handlers.js'),
    comments = require('./modules/comment-handlers.js'),
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
    check_inputs.signin(req.body.user).catch(function(error_field){
        console.log(error("input " + error_field + " not correct"));
        //make sure an error message shows up.
        throw error_field;
    }).then(function(){
        user.checkDB(req.body.user.username).catch(function(err){
            console.log(error("Error in Register Post"));
            throw err;
            //message
        }).then(function(id){
            if (id.id) {
                console.log(blue("username already exists"));
                //message "that username has already been registered. try logging in."
            } else {
                user.save_registration(req.body.user).catch(function(err){
                    console.log(error("error putting info in database"));
                    throw err;
                }).then(function(){
                    res.json({
                        success: true
                    });
                });
            }
        });
    });
});
app.post('/login', function(req,res){
    check_inputs.signin(req.body.user).catch(function(error_field){
        console.log(error("input " + error_field + " not correct"));
        //make sure an error message shows up.
        throw error_field;
    }).then(function(){
        user.checkDB(req.body.user.username).catch(function(){
            console.log(error("Username not found"));
            throw "error";
            //message for username not found, please try again or register
        }).then(function(data){
            bcrypt.checkPassword(req.body.user.password, data[0].password).catch(function(err){
                console.log(error("Error checking password"));
                throw err;
                //message please try again
            }).then(function(matches){
                //set cookie
                if (matches) {
                    res.json({success:true});
                } else {
                    console.log(blue("Incorrect password"));
                    //message
                }
            });
        });
    });
});
app.get('/comments', function(req, res){
    comments.retrieve(req.query.id).then(function(comments){

        comments.sort(function(x, y){
            return x.id - y.id;
        });

        res.json({
            success: true,
            comments: comments
        });
    });
});

app.get('/comments/child', function (req,res){
    comments.retrieveChild(req.query.id).then(function(comments){
        res.json({
            success: true,
            comments: comments
        });
    });
});

app.post('/comments', function (req, res){
    if(req.body.parent){
        comments.postComment(req.body.comment, req.body.link, req.body.parent, req.body.user).then(function(returnedComments){
            res.json({
                success: true,
                comments: returnedComments
            });
        }).catch(function(err){
            console.log(err);
        });
    } else {
        comments.postComment(req.body.comment, req.body.link, 0, req.body.user).then(function(returnedComments){
            res.json({
                success: true,
                comments: returnedComments
            });
        }).catch(function(err){
            console.log(err);
        });
    }
});

app.get('/links', function(req, res){
    link.retrieve().then(function(links){
        res.json({
            success: true,
            links: links
        });
    });
});

app.get('/user-settings', function(req,res){
    user.get_profile(req.query.username).catch(function(err){
        console.log(error("error getting profile info from database"));
        throw err;
    }).then(function(info){
        console.log(blue("Info got"));
        res.json({
            success: true,
            info: info[0]
        });
    });
});

app.post('/edit-user', function(req,res){
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
    console.log("saving to datavase");
    console.log(req.query);
    link.upload(req).catch(function(error){
        console.log(error("error saving to database"));
        //show this in a message
        throw error;
    }).then(function(){
        res.json({success:true});
    });
});

app.listen(process.env.PORT || 8080, function(){
    console.log("I'm so turned on right now");
});
