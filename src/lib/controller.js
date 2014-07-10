var fs = require('fs'),
    async = require('async'),
    cache = require('memory-cache'),
    ZipStream = require('zip-stream');

var sayHello = function(term, callback) {
    var result = {
        hello: 'world',
        term: term
    };

    callback(null, result);
}

// List all existings files (internal)
var listFiles = function(folderPath, callback) {};

// Check in each files (internal)
var exploreFiles = function(term, files, callback) {};

module.exports = {

    hello: function(term, callback) {
        return sayHello(term, callback);
    },

    search: function(term, callback) {
        return callback(null, null);
    },

    download: function(term, callback) {
        return callback(null, null);
    }

};