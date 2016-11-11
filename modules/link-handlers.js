const dbconnect = require('./dbconnect.js');

exports.retrieve = function (){
    return new Promise(function(resolve, reject){
        dbconnect.pgConnect('SELECT * from links').then(function(results){
            resolve(results.rows);
        }).catch(function(err){
            reject(err);
        });
    });
};

exports.upload = function(req){

    return new Promise(function(resolve,reject){
        var data = req.query;
        
        if (!Array.isArray(data.tags)){
            data.tags = [data.tags];
        }
        //db save stuff
        //need to handle saving the username, once user is handled

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
