'use strict';

const debug = require('debug')('http:body-parser');

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    debug('#bodyParser');
    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request);
    }

    let message = '';
    request.on('data', data => {
      debug(`chunked req data: ${data.toString()}`);
      message += data.toString();
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(message);
        debug(`completed req body: ${request.body}`);
        return resolve(request);
      } catch (err) {
        return reject(err);
      }
    });

    request.on('error', err => {
      debug(`error occured on parsing request body: ${err}`);
      return reject(err);
    });
  });
};
