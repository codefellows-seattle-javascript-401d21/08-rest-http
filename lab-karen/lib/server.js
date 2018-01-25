'use strict';

// Application dependencies
const http = require('http'); //require http fron NodeJS
const Router = require('./router'); //require functionality in router.js

// Router setup
const router = new Router(); //new instance
require('../route/route-note')(router); //require functionality in route-note.js

// Application setup
const app = http.createServer(router.route()); //create server

// Server controls
const server = module.exports = {};
server.start = (PORT, cb) => app.listen(PORT, cb);
server.stop = (cb) => app.close(cb);
