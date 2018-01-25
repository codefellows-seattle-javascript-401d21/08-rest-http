'use strict';

// application dependencies
const http = require('http');
const Router = require('./router');

// router setup
const router = new Router();
require('../route/route-note')(router);

// application setup
const app = http.createServer(router.route());

// server controls
const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);
