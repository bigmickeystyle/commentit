'use strict';

var expect = require('chai').expect;

describe('gethtml', function() {
    it('should exist', function() {
        var requesthtml = require('../test-module/reqesthtml.js');
        expect(requesthtml).to.not.be.undefined;
    });
});
