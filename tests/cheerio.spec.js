var rewire = require('rewire');
var expect = require('chai').expect;
var cheerio = rewire('../modules/cheerio');
var html="<html><head><meta property='og:url' content='content'><meta property='og:image' content='image'><meta property='og:description' content='desccription'><meta property='og:title' content='title'><meta property='og:type' content='type'><meta property='og:site_name' content='siteName'><link rel='apple-touch-icon' href='icon'></head></html>";

console.log(html);

function mockrequest(url, callback){
    callback(null, {statusCode: 200}, html);
}

cheerio.__set__('request', mockrequest);

describe('cheerio', function () {
    it('should return correct object', function (done) {
        // arrange

        // act
        cheerio(15, function(err, result){
            expect(result).to.equal({
                url: 'url',
                image: 'image',
                description: 'description',
                title: 'title',
                type: 'type',
                siteName: 'siteName',
                thumbnail: 'icon'
            });
            expect(err).to.be.null;
            done();
        });

    });
});
