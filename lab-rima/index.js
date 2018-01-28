'use strict';

require('dotenv').config();

const server = require('./lib/server');
server.start(8888,
  () => console.log('Listening on 8888'));
