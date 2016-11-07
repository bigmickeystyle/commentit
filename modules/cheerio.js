const request = require('request');
const cheerio = require('cheerio');

function parseUrl(url){
    return new Promise(function (resolve, reject){
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var info = {};
                info.url = ($('meta[property="og:url"]').attr('content'));
                info.image = ($('meta[property="og:image"]').attr('content'));
                info.description = ($('meta[property="og:description"]').attr('content'));
                info.title = ($('meta[property="og:title"]').attr('content'));
                info.type = ($('meta[property="og:type"]').attr('content'));
                info.siteName = ($('meta[property="og:site_name"]').attr('content'));
                info.thumbnail = ($('meta[name="thumbnail"]').attr('content'));
                resolve(info);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = parseUrl;
