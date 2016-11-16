const dbconnect = require('./dbconnect.js');

exports.upvote = function(info){
    return new Promise(function(resolve, reject){
        var username = info.username;
        var link_id = info.link.id;
        var call = 'INSERT INTO upvotes (username, link_id) VALUES ($1, $2);';
        var params = [username, link_id];
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(){
            resolve();
        });
    });
};
exports.bookmark = function(info){
    return new Promise(function(resolve, reject){
        var username = info.username;
        var link_id = info.link.id;
        var call = 'INSERT INTO bookmarks (username, link_id) VALUES ($1, $2);';
        var params = [username, link_id];
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(){
            resolve();
        });
    });
};
exports.retrieveUpvote = function(info){
    return new Promise(function(resolve,reject){
        var username = info.username;
        var link_id = info.id;
        var call = 'SELECT id FROM upvotes WHERE username = $1 AND link_id = $2;';
        var params = [username, link_id];
        dbconnect.pgConnect(call, params).catch(function(err){
            reject(err);
        }).then(function(data){
            resolve(data.rows[0]);
        });
    });
};
exports.retrieveAllUpvotes = function(username){
    return new Promise(function(resolve,reject){
        console.log("in retrieveAllUpvotes");
        var call = 'SELECT link_id FROM upvotes WHERE username = $1 ORDER BY created;';
        dbconnect.pgConnect(call, [username]).catch(function(err){
            reject(err);
        }).then(function(data){
            resolve(data.rows)
        });
    });
};
exports.retrieveLinks = function(link_ids){
    return new Promise(function(resolve,reject){
        //order by comment created date
        console.log("retrieving");
        var call = "SELECT * FROM links WHERE id = ANY($1);";
        dbconnect.pgConnect(call, [link_ids]).catch(function(err){
            reject(err);
        }).then(function(data){
            resolve(data.rows)
        });
    });
};
