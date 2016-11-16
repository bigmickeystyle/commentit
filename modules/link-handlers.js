const dbconnect = require('./dbconnect.js');

exports.retrieve = function (){
    return new Promise(function(resolve, reject){
        dbconnect.pgConnect('SELECT * from links ORDER BY Created DESC;').then(function(results){
            resolve(results.rows);
        }).catch(function(err){
            reject(err);
        });
    });
};
exports.retrievePopular = function (){
    return new Promise(function(resolve, reject){
        dbconnect.pgConnect('SELECT * from links ORDER BY upvote_count DESC;').then(function(results){
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
