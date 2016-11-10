const dbconnect = require('./dbconnect.js'),
    bcrypt = require('./bcrypt.js'),
    check = require('./check-inputs.js');
const chalk = require('chalk');
var error = chalk.bold.magenta;
var property = chalk.cyan;
var green = chalk.green;
var blue = chalk.blue;

exports.checkDB = function(username) {
    return new Promise(function(resolve, reject){
        var call = "SELECT id FROM users WHERE username = $1;";
        callDB(call,[username],resolve,reject);
    });
};
exports.save_registration = function(user) {
    return new Promise(function(resolve,reject){
        bcrypt.hashPassword(user.password).catch(function(err){
            reject(err);
        }).then(function(hash){
            user.password = hash;
            var call = "INSERT INTO users (username, password) VALUES ($1, $2)";
            var params = [user.username, user.password];
            callDB(call,params,resolve,reject);
        });
    });
};
exports.get_profile = function(username){
    return new Promise(function(resolve,reject){
        console.log(username);
        var call = "SELECT username, email, age, location, interests FROM users WHERE username=$1;";
        callDB(call,[username],resolve,reject);
    });
};
exports.edit_profile = function(info){
    return new Promise(function(resolve,reject){
        var interests = info.interests;
        if (interests) {
            if (interests.search(",") == -1) {
                info.interests = [interests];
            } else {
                interests = interests.split(",");
                info.interests = interests.map(function(elem){
                    return elem.trim();
                });
            }
        } else {
            info.interests = [];
        }
        var params = [info.email, info.age, info.location, info.interests, info.username];
        if (!info.password) {
            var call = "UPDATE users SET email=$1, age=$2, location=$3, interests=$4 WHERE username=$5;";
            callDB(call,params,resolve,reject);
        } else {
            call = "UPDATE users SET email=$1, age=$2, location=$3, interests=$4, password=$5 WHERE username=$6;";
            bcrypt.hashPassword(info.password).catch(function(err){
                reject(err);
            }).then(function(hash){
                params.splice(4,0,hash);
                callDB(call,params,resolve,reject);
            });
        }
    });
};

function callDB(call,params,resolve,reject){
    dbconnect.pgConnect(call, params).then(function(output){
        console.log(output.rows);
        resolve(output.rows);
    }).catch(function(err){
        reject(err);
    });
}
