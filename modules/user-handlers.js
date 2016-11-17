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
        var call = "SELECT id, password FROM users WHERE username = $1;";
        callDB(call,[username],resolve,reject);
    });
};
exports.saveRegistration = function(user) {
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
exports.getUserSettings = function(username){
    return new Promise(function(resolve,reject){
        var call = "SELECT username, email, age, location, interests FROM users WHERE username=$1;";
        callDB(call,[username],resolve,reject);
    });
};
exports.editProfile = function(info){
    return new Promise(function(resolve,reject){
        var interests = info.interests;
        console.log(interests);
        if (interests) {
            if(Array.isArray(interests)){
                info.interests = interests;
            } else if (interests.search(",") == -1) {
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
exports.retrieveUserLinks = function (info){
    return new Promise(function(resolve, reject){
        if (!info.loggedin) {
            var call = 'SELECT * FROM links WHERE username = $1 ORDER BY created;';
            var params = [info.username];
        } else {
            call = 'SELECT * FROM links LEFT JOIN bookmarks ON bookmarks.link_id = links.id\
             AND bookmarks.username = $1 WHERE links.username = $2 ORDER BY links.created DESC;';
            params = [info.username, info.loggedin];
        }
        dbconnect.pgConnect(call, params).then(function(results){
            resolve(results.rows);
        }).catch(function(err){
            reject(err);
        });
    });
};
exports.retrieveUpvotedLinks = function(info){
    return new Promise(function(resolve,reject){
        if (!info.loggedin) {
            var call = "SELECT * FROM links LEFT JOIN upvotes ON upvotes.link_id = links.id\
            WHERE upvotes.username = $1 ORDER BY upvotes.created DESC;";
            var params = [info.username];
        } else {
            call = 'SELECT * FROM links LEFT JOIN upvotes ON upvotes.link_id = links.id\
            LEFT JOIN bookmarks ON bookmarks.link_id = links.id AND bookmarks.username = $1 WHERE upvotes.username = $2 ORDER BY upvotes.created DESC;';
            params = [info.loggedin, info.username];
        }
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(data){
            resolve(data.rows);
        });
    });
};
exports.retrieveBookmarkedLinks = function(info){
    return new Promise(function(resolve,reject){
        if (!info.loggedin) {
            var call = "SELECT * FROM links LEFT JOIN bookmarks ON bookmarks.link_id = links.id\
            WHERE bookmarks.username = $1 ORDER BY bookmarks.created DESC;";
            var params = [info.username];
        } else {
            call = 'SELECT * FROM links LEFT JOIN bookmarks AS b1 ON b1.link_id = links.id AND b1.username = $1\
            LEFT JOIN bookmarks AS b2 ON b2.link_id = links.id WHERE b2.username = $2 NOT b2.bookmarked ORDER BY b2.created DESC;';
            params = [info.loggedin, info.username];
        }
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(data){
            resolve(data.rows);
        });
    });
};
exports.retrieveComments = function(username){
    return new Promise(function(resolve,reject){
        var call = "SELECT * FROM comments WHERE username = $1 ORDER BY created DESC;";
        callDB(call,[username],resolve,reject);
    });
};
exports.retrieveLink = function(link_ids,loggedin){
    return new Promise(function(resolve,reject){
        if (!loggedin) {
            var call = "SELECT * FROM links WHERE id = ANY($1);";
            var params = [link_ids];
        } else {
            call = 'SELECT * FROM links LEFT JOIN bookmarks ON bookmarks.link_id = links.id AND bookmarks.username = $1 WHERE links.id = ANY($2);';
            params = [loggedin, link_ids];
        }
        callDB(call,params,resolve,reject);
    });
};
exports.upvote = function(username){
    return new Promise(function(resolve,reject){
        var call = 'UPDATE users SET upvotes = upvotes+1 WHERE username=$1;';
        callDB(call,[username],resolve,reject);
    });
};
exports.upvotes = function(username){
    return new Promise(function(resolve,reject){
        var call = 'SELECT upvotes FROM users WHERE username = $1;';
        callDB(call,[username],resolve,reject);
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
