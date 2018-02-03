'use strict';

//example of promisifying things
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'}); //can ignore callbacks for fs.readFile, pass it .then .catch instead 
//suffix: 'Prom' allws us to distinguish between the original version and promisified version. both versions available for use
// fs.readFile(path, callback) //normal version
// fs.readFileProm(path).then().catch(); //suffix version

//app dependencies
const http = require('http'); 
const Router = require('./router'); //require in router.js modules, in same directory so DONT need ./lib/router

//router setup
const router = new Router(); //creates new instance of router object from constructor
require('../route/route-note')(router); //require in, and then 'inject' or immediately pass in the instance of that thing we just created on line above

//app setups
const app = http.createServer(router.route()); //pass router module .route() function in to the http.createServer()
//returns code from server that was taken out and moved to the router, just modularizing the things ayyyy

//server controls
const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);