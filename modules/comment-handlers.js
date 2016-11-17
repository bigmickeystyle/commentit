const dbconnect = require('./dbconnect.js');

exports.retrieve = function (link) {
    return new Promise(function (resolve, reject){
        var call = "SELECT * from comments WHERE link_id = $1 AND parent_id = 0";
        callDB(call, [link], resolve, reject);
    });
};

exports.retrieveChild = function (parent) {
    return new Promise(function (resolve, reject){
        var call = "SELECT * from comments WHERE parent_id = $1";
        callDB(call, [parent], resolve, reject);
    });
};

exports.postComment = function (comment, link, parent, user) {
    return new Promise(function (resolve, reject){
        if (parent){
            dbconnect.pgConnect("UPDATE comments SET replies = replies + 1 WHERE id=$1", [parent]);
        }
        console.log(link);
        var call = "INSERT INTO comments (parent_id, link_id, username, comment, upvote_count) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        var vals = [parent, link.id, user, comment, 1];
        callDB(call, vals, resolve, reject);
    });
};


function callDB(call,params,resolve,reject){
    dbconnect.pgConnect(call, params).then(function(output){
        resolve(output.rows);
    }).catch(function(err){
        reject(err);
    });
}
