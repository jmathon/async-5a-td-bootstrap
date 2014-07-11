var cluster = require('cluster');

if (cluster.isMaster) {
    
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i++) {
    	cluster.fork();
    };

} else {

    var srv = require('./server.js');

}