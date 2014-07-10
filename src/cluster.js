var cluster = require('cluster');

if (cluster.isMaster) {
    
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

} else {

    var srv = require('./server.js');

}