'use strict';

require('dotenv').config();

const server = require('./lib/server');
console.log(process.env.PORT);
server.start(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));