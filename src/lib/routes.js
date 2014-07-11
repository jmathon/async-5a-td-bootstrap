var controller = require('./controller.js');

var hello = function(req, res) {

	var term = req.term;

    return controller.hello(term, function(err, result) {
        return res.json(200, result);
    });

};

var search = function(req, res) {
    var term = req.term;
	return controller.search(term, function (err, result) {
        res.json(200, result);
    });
};

var download = function(req, res) {
	var term = req.term;
    return controller.download(term, function (err, result) {
        result.pipe(res);
    });
};

var addFile = function (req, res) {
    var url = req.url;
    return controller.addFile(url, function (err, result) {
        // do something
    })
};

var apiKeys = ['8cf1a2c0-26ff-479d-b271-c31a316a3bfc'];

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// Configures app routes
module.exports = function(app) {

    // Auto extract term param
    app.param('term', function(req, res, next, id) {
        var term = id;
        req.term = term;
        next();
    });

    app.use('/', function(req, res, next){
        var key = req.query['api-key'];

        // key isnt present
        if (!key) return next(error(400, 'api key required (tips: 8cf1a2c0-26ff-479d-b271-c31a316a3bfc)'));

        // key is invalid
        if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key (tips: 8cf1a2c0-26ff-479d-b271-c31a316a3bfc)'));

        // all good, store req.key for route access
        req.key = key;
        next();
    });

    app.get('/hello/:term?', hello);
    app.get('/search/:term?', search)
    app.get('/download/:term?', download)
    
};