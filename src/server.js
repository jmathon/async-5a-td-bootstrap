var express = require('express'),
    http = require('http'),
    underscore = require('underscore'),
    app = express(),
    opts = require('./lib/config/opts.js');

// Adds underscore as a global variable (it will be available in all modules)
global._ = underscore;

require('./lib/config/express.js')(express, app);

// Load routes
require('./lib/routes.js')(app);

// Start the server
http.createServer(app).listen(opts.port, function() {
    console.log("Express server listening on port %d in %s mode",
        opts.port, app.settings.env);
});