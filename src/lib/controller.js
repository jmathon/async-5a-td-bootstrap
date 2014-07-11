var fs = require('fs'),
    async = require('async'),
    cache = require('memory-cache'),
    ZipStream = require('zip-stream');
    path = require('path');

var sayHello = function(term, callback) {
    var result = {
        hello: 'world',
        term: term
    };

    callback(null, result);
}

var searchInFiles = function (term, callback) {
    var dirPath = 'contents/files/rfc';
    var fileResults = [];

    fs.readdir(dirPath, function (err, files) {
        if(err) throw err;

        files.forEach (function (file) {
            var filePath = path.join(dirPath, file);
            var results = []
            fs.readFile(filePath, 'utf-8', function (err, data) {
                if(err) throw err;

                var match = data.match(new RegExp(term, 'g'));
                if(match !== null && match.length > 0){
                    fileResults.push({ file: file, count : match.length });
                }

                
                if((files.length - 1) === files.indexOf(file)) {
                    callback(null, { title: 'Node Async Search', term: term, results: fileResults });  
                } 
            })
        })
    })
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
        return searchInFiles(term, callback);
    },

    download: function(term, callback) {
        return callback(null, null);
    }

};