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
    if(cache.get(term) != null) {
        callback(null, cache.get(term));
        return;
    }

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
                    var response = { title: 'Node Async Search', term: term, results: fileResults };
                    cache.put(term, response, 200);
                    callback(null, response);  
                } 
            })
        })
    })
}

var zipFile = function (data, callback) {
    var dirPath = 'contents/files/rfc';
    if(data != null) {
        var results = data.results;

        var zip = new ZipStream();

        async.eachSeries(results, function (entry, clb) {
            var filePath = path.join(dirPath, entry.file);
            var zipEntry = fs.createReadStream(filePath);
            var name = entry.file;
            zip.entry(zipEntry, { name: name }, function(err, test) {
                clb();
            });
        }, function (err) {
            zip.finalize();
            callback(null, zip);
        });
    }
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
        return searchInFiles(term, function (err, data) {
            zipFile(data, callback);
        });
    }

};