var util = require('./../util.js');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function (express, app) {

    app.use(require('morgan')('dev'));
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json())
    app.use(methodOverride());

    app.use(function(req, res, next) {
        next();
    });

    // Create static file servers for the build and public folders
    app.use(express.static(__dirname + '/../../contents/public'));

    // Error handler
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.json(500, err);
    });

};
