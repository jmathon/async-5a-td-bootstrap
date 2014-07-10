var controller = require('./controller.js');

var hello = function(req, res) {

	var term = req.term;

    return controller.hello(term, function(err, result) {
        return res.json(200, result);
    });

};

var search = function(req, res) {
	// Do Search
};

var download = function(req, res) {
	// Do download
};

// Configures app routes
module.exports = function(app) {

    // Auto extract term param
    app.param('term', function(req, res, next, id) {
        var term = id;
        req.term = term;
        next();
    });

    app.get('/hello/:term?', hello);
    
};