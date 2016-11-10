const dbconnect = require('./dbconnect.js');

exports.retrieve = function (link) {
    return new Promise(function (resolve, reject){
        var call = "SELECT * from comments WHERE link_id = $1";
        callDB(call, [link], resolve, reject);
    });
};

function callDB(call,params,resolve,reject){
    dbconnect.pgConnect(call, params).then(function(output){
        resolve(output.rows);
    }).catch(function(err){
        reject(err);
    });
}
