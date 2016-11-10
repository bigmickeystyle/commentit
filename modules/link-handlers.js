const dbconnect = require('./dbconnect.js'),
    cheerio = require('./cheerio.js');

exports.parse = function(req,res){
    cheerio(req.query.url).then(function(results){
        res.json({
            success: true,
            info: results
        });
    }).catch(function(error){
        res.json({
            success: false,
            info: error
        });
    });
};
// exports.string = function(tags){
//     if (tags) {
//         if (tags.search(",") == -1) {
//             return [tags];
//         } else {
//             tags = tags.split(",");
//             tags = tags.map(function(elem){
//                 return elem.trim();
//             });
//             return tags;
//         }
//     } else {
//         return [];
//     }
// };

exports.upload = function(req,res){
    var tags = req.query.tags;
    console.log(this.string(tags));

    if (tags) {
        if (tags.search(",") == -1) {
            req.query.tags = [tags];
        } else {
            tags = tags.split(",");
            req.query.tags = tags.map(function(elem){
                return elem.trim();
            });
        }
    } else {
        req.query.tags = [];
    }

    var data = req.query;
    //db save stuff
    //need to handle saving the username, once user is handled
    var call = 'INSERT INTO links (url, username, siteName, siteType, headline, description, image, thumbnail, tags)\
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
    var params = [data.url, data.username, data.siteName, data.type, data.title, data.description, data.image, data.thumbnail, data.tags];
    dbconnect.pgConnect(call, params).then(function(){
        res.json({success: true});
        //handle errors in database by sending with a message
    });
};
