'use strict';

const debug = require('debug')('http:body-parser'); //debug pathname

module.exports = function (request) {
  return new Promise((resolve, reject) => {
    debug('bodyParser');
    //if GET or DELETE return cuz no body
    if(request.method === 'GET') return resolve(request);

    let message = '';
    //get data
    request.on('data', data => {
      debug(`Chunked request data: ${data.toString()}`);
      message += data.toString();
    });
    //data done, test with parse that data is right type
    request.on('end', () => {
      try {
        request.body = JSON.parse(message);
        debug(`Completed request body: ${request.body}`);
        return resolve(request);
      } catch(err) {
        return reject(err);
      }
    });
    //error handling
    request.on('error', err => {

      debug(`Error occurred on parsing request body: ${err}`);
      return reject(err);
    });
  });
};
