'use strict';

//example of promisifying things
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'}); //can ignore callbacks for fs.readFile, pass it .then .catch instead 
//suffix: 'Prom' allws us to distinguish between the original version and promisified version. both versions available for use
// fs.readFile(path, callback) //normal version
// fs.readFileProm(path).then().catch(); //suffix version

const http = require('http');
const Router = require('./router');

const router = new Router();
require('../route/route-note')(router);

const app = http.createServer(router.route());

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);