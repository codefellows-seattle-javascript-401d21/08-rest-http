'use strict';

const server = require('./lib/server'); //require functionality in server.js
const dotenv = require('dotenv'); //package for .env
const PORT = process.env.PORT || 5000; //get port from .env because something up with .env

server.start(PORT, () => console.log(`listening on port: ${PORT}`)); //start server on port 3000 using .env
