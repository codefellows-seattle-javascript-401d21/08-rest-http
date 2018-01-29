'use strict';

//app dependencies
const http = require('http');
const Router = require('./router');

//Router Setup
const router = new Router();
require('../route/route-note')(router);

//App setup
const app = http.createServer(router.route());

//Server Controls
const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb); //I think this is actively listening to call backs on the port when server stops and server stops