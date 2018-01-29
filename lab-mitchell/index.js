'use strict';

//.config() tells package to look for that file, can be defined in the .config(<like this ayyy>) , could be .test.env for different configurations for DEV/TESTING, not something we need in PRODUCTION
require('dotenv').config(); //requires dovenv NPM package, calls its config command which just tells app to look for .env variables included in the .env file

const server = require('./lib/server'); //requires in server module
server.start(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)); //starts server listening on PORT specified in .env file