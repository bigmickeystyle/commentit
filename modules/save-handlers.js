const dbconnect = require('./dbconnect.js');

exports.upvote = function(info){
    return new Promise(function(resolve, reject){
        var call = 'INSERT INTO upvotes (username, link_id) VALUES ($1, $2);';
        var params = [info.username, info.link.id];
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(){
            resolve();
        });
    });
};
exports.bookmark = function(info){
    return new Promise(function(resolve, reject){
        console.log(info);
        var call = 'INSERT INTO bookmarks (username, link_id) VALUES ($1, $2);';
        var params = [info.username, info.link_id];
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(){
            resolve();
        });
    });
};
exports.removeBookmark = function(info){
    return new Promise(function(resolve,reject){
        var call = 'DELETE FROM bookmarks WHERE username = $1 AND link_id = $2;';
        var params = [info.username, info.link_id];
        dbconnect.pgConnect(call,params).catch(function(err){
            reject(err);
        }).then(function(){
            resolve();
        });
    });
};
exports.retrieveUpvote = function(info){
    return new Promise(function(resolve,reject){
        var call = 'SELECT id FROM upvotes WHERE username = $1 AND link_id = $2;';
        var params = [info.username, info.id];
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(data){
            resolve(data.rows[0]);
        });
    });
};
