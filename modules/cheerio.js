var request = require('request');
const cheerio = require('cheerio');

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
                    "siteName": $('meta[property="og:site_name"]').attr('content')
                };
                var re = new RegExp("^\/[A-Za-z0-9]");
                if(re.test(thumbnail)){
                    var submittedurl = require('url').parse(info.url);
                    thumbnail = submittedurl.protocol + '//' + submittedurl.hostname + thumbnail;
                    info.thumbnail = thumbnail;
                    resolve(info);
                } else if ($('link[rel="apple-touch-icon"]').attr('href')) {
                    thumbnail = ($('link[rel="apple-touch-icon"]').attr('href'));
                    info.thumbnail = thumbnail;
                    resolve(info);
                } else if ($('link[rel="shortcut icon"]').attr('href')){
                    thumbnail = $('link[rel="shortcut icon"]').attr('href');
                    info.thumbnail = thumbnail;
                    resolve(info);
                } else if($('link[rel="icon"]').attr('href')){
                    var thumbnail = $('link[rel="icon"]').attr('href');
                    info.thumbnail = thumbnail;
                    resolve(info);
                } else {
                    resolve(info);
                }
            } else {
                reject(error);
            }
        });
    });
}

module.exports = parseUrl;
