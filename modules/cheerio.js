var request = require('request');
const cheerio = require('cheerio'),
    urlmod = require('url'),
    util = require('util');


function parseUrl(url){
    return new Promise(function (resolve, reject){
        request = request.defaults({jar: true});
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var info = {
                    "url": $('meta[property="og:url"]').attr('content'),
                    "image": $('meta[property="og:image"]').attr('content'),
                    "description": $('meta[property="og:description"]').attr('content'),
                    "title": $('meta[property="og:title"]').attr('content'),
                    "type": $('meta[property="og:type"]').attr('content'),
                    "siteName": $('meta[property="og:site_name"]').attr('content'),
                    "thumbnail": $('meta[name="thumbnail"]').attr('content')
                };
                resolve(info);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = parseUrl;
