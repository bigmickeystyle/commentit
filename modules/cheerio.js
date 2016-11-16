var request = require('request');
const cheerio = require('cheerio');

function parseUrl(url){
    return new Promise(function (resolve, reject){
        request = request.defaults({
            jar: true,
            headers: {
                'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36"
            }
        });
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var info = {
                    "url": $('meta[property="og:url"]').attr('content') || $('meta[name="og:url"]').attr('content'),
                    "image": $('meta[property="og:image"]').attr('content') || $('meta[name="og:image"]').attr('content'),
                    "description": $('meta[property="og:description"]').attr('content') ||  $('meta[name="og:description"]').attr('content'),
                    "title": $('meta[property="og:title"]').attr('content') || $('meta[name="og:title"]').attr('content'),
                    "type": $('meta[property="og:type"]').attr('content') || $('meta[name="og:type"]').attr('content'),
                    "siteName": $('meta[property="og:site_name"]').attr('content') || $('meta[name="og:site_name"]').attr('content')
                };
                var re = new RegExp("^\/[A-Za-z0-9]");
                if ($('link[rel="apple-touch-icon"]').attr('href')) {
                    thumbnail = ($('link[rel="apple-touch-icon"]').attr('href'));
                    info.thumbnail = thumbnail;
                    checkThumb(thumbnail);
                } else if ($('link[rel="apple-touch-icon-precomposed"]').attr('href')) {
                    thumbnail = ($('link[rel="apple-touch-icon-precomposed"]').attr('href'));
                    info.thumbnail = thumbnail;
                    checkThumb(thumbnail);
                } else if($('link[rel="icon"]').attr('href')){
                    var thumbnail = $('link[rel="icon"]').attr('href');
                    info.thumbnail = thumbnail;
                    checkThumb(thumbnail);
                } else if ($('link[rel="shortcut icon"]').attr('href')){
                    thumbnail = $('link[rel="shortcut icon"]').attr('href');
                    info.thumbnail = thumbnail;
                    checkThumb(thumbnail);
                }
                function checkThumb(thumb){
                    if(re.test(thumb)){
                        var submittedurl = require('url').parse(info.url);
                        thumb = submittedurl.protocol + '//' + submittedurl.hostname + thumbnail;
                        info.thumbnail = thumb;
                        resolve(info);
                    } else {
                        resolve(info);
                    }
                }
            } else {
                reject(error);
            }
        });
    });
}

module.exports = parseUrl;
