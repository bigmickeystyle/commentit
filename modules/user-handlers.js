const dbconnect = require('./dbconnect.js'),
    bcrypt = require('./bcrypt.js'),
    check = require('./check-inputs.js');
const chalk = require('chalk');
var error = chalk.bold.magenta;
var property = chalk.cyan;
var green = chalk.green;
var blue = chalk.blue;

exports.check_for_user = function(username) {
    return new Promise(function(resolve, reject){
        var call = "SELECT id FROM users WHERE username = $1;";
        dbconnect.pgConnect(call,[username]).then(function(id){
            if (id.rows.length == 1){
                resolve(true);
            } else {
                resolve();
            }
        }).catch(function(err){
            reject(err);
        });
    });
};
exports.unique_register = function(req,res) {
    var user = req.body.user;
    //check data for this too;
    //remove email,age, location, interests to profile
    bcrypt.hashPassword(user.password).then(function(hash){
        user.password = hash;
        var call = "INSERT INTO users (username, password, email, age, location, interests) VALUES ($1, $2, $3, $4, $5, $6)";
        var params = [user.username, user.password, user.email, user.age, user.location, user.interests];
        dbconnect.pgConnect(call, params).then(function(){
            console.log(property("Success!"));
            res.json({
                success: true
            });
        }).catch(function(err){
            console.log(err);
        });
    });
};
