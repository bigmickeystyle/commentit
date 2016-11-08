var request = require('request');
const cheerio = require('cheerio');
const urlmod = require('url');

function parseUrl(url){
    return new Promise(function (resolve, reject){
        console.log("Cheerio!");
        var options = {
            url: url,
            headers: {
                'User-Agent': "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
                'Cookie': 'nyt-a=d00d4c6f9393f25b9ce9af8e0133c11725bcdcc11edba4cab21cff2efc4274eb; Expires=Wed, 08 Nov 2017 10:16:04 GMT; Path=/; Domain=.nytimes.com'
            }
        };
        request = request.defaults({jar: true});
        request(url, function (error, response, html) {
            console.log("response " + response);
            console.log(error);
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
