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

var elementDictionary = {};

var searchInFiles = function (term, callback) {
    var dirPath = 'contents/files/rfc';
    var fileResults = [];

    if(cache.get(term) != null) {
        callback(null, cache.get(term));
        cache.put(term, cache.get(term), 600);
        return;
    }
    if(elementDictionary[term] !== undefined) {
        elementDictionary[term].push(callback);
    } else {
        elementDictionary[term] = [callback];

        
        fs.readdir(dirPath, function (err, files) {
            if(err) throw err;

            async.eachLimit(files, 5, function (item, clb) {
                var filePath = path.join(dirPath, item);
                fs.readFile(filePath, 'utf-8', function (err, data) {
                    if(err) throw err;

                    var match = data.match(new RegExp(term, 'g'));
                    if(match !== null && match.length > 0){
                        fileResults.push({ file: item, count : match.length });
                    }

                    clb();
                })
            }, function () { 
                var response = { title: 'Node Async Search', term: term, results: fileResults };
                cache.put(term, response, 600);
                elementDictionary[term].forEach(function(item) {
                    item(null, response);   
                })
                delete elementDictionary[term];
            })
        })
    }
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