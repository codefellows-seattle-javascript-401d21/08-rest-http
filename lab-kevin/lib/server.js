'use strict';

const http = require('http');
const Router = require('./router');

//router setup
const router = new Router()
require('../route/route-note')(router);

const app = http.createServer(router.route());

const server = module.exports = {};
//server controls
server.start = (PORT, cb) => app.http.listen(PORT, cb);
server.stop = cb => app.close(cb);