'use strict';

// Application Dependencies
const http = require('http');
const Router = require('./router.js');

// Router Setup
const router = new Router();
require('../route/route-note.js')(router);

//Application Setup
const app = http.createServer(router.route());

// Server Controls
const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);