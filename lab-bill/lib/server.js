'use strict';

const http = require('http');
const Router = require('./router');

const router = new Router();
require('../route/route-note')(router);

const app = http.createServer(router.routes());

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.start = (cb) => app.close(cb);
 