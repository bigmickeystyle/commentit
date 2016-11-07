const request = require('request');
const cheerio = require('cheerio');

function parseUrl(url){
    return new Promise(function (resolve, reject){
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var entries = ($('.entry').find('.outbound').each(function(){
                    console.log($(this).attr('href'));
                }));
                resolve(entries);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = parseUrl;
