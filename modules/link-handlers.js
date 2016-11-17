const dbconnect = require('./dbconnect.js');

exports.retrieve = function (loggedin){
    return new Promise(function(resolve, reject){
        if (!loggedin) {
            var call = 'SELECT * FROM links ORDER BY Created DESC;';
            var params = [];
            console.log('no' + loggedin);
        } else {
            // call = 'SELECT * FROM links LEFT JOIN bookmarks ON bookmarks.link_id = links.id AND bookmarks.username = $1 ORDER BY links.created DESC;';
            call = "select * from links order by links.created DESC";
            // params = [loggedin];
            console.log("yes" + loggedin);
        }
        // dbconnect.pgConnect(call, params).then(function(results){
        dbconnect.pgConnect(call).then(function(results){
            console.log(results.rows);
            resolve(results.rows);
        }).catch(function(err){
            reject(err);
        });
    });
};
exports.retrievePopular = function (loggedin){
    return new Promise(function(resolve, reject){
        if (!loggedin) {
            var call = 'SELECT * FROM links ORDER BY upvote_count DESC;';
            var params = [];
        } else {
            call = 'SELECT * FROM links LEFT JOIN bookmarks ON bookmarks.link_id = links.id AND bookmarks.username = $1 ORDER BY links.upvote_count DESC;';
            params = [loggedin];
        }
        dbconnect.pgConnect(call, params).then(function(results){
            resolve(results.rows);
        }).catch(function(err){
            reject(err);
        });
    });
};
exports.upvote = function(link){
    return new Promise(function(resolve,reject){
        var call = 'UPDATE links SET upvote_count = upvote_count + 1 WHERE id = $1;';
        var params = [link.id];
        dbconnect.pgConnect(call, params).catch(function(error){
            reject(error);
        }).then(function(){
            resolve();
        });
    });
};
exports.upload = function(req){
    return new Promise(function(resolve,reject){
        var data = req.query;
        if (!Array.isArray(data.tags)){
            data.tags = [data.tags];
        }
        var call = 'INSERT INTO links (url, username, siteName, siteType, headline, description, image, thumbnail, tags)\
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
        var params = [data.url, data.username, data.siteName, data.type, data.title, data.description, data.image, data.thumbnail, data.tags];
        dbconnect.pgConnect(call, params).catch(function(error){
            reject(error);
        }).then(function(){
            resolve();
        });
    });
};
exports.checkExistence = function(url){
    return new Promise(function(resolve,reject){
        var call = 'SELECT id FROM links WHERE url = $1;';
        dbconnect.pgConnect(call,[url]).catch(function(error){
            reject(error);
        }).then(function(info){
            if (info.rows.length == 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};
