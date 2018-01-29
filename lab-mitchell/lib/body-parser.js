'use strict';

const debug = require('debug')('http:body-parser');

//same body parser as yesterday, minus url/querystring parser as they're in their own module this time
module.exports = function(request) { //exports anonymous function expecting single request argument
  return new Promise((resolve, reject) => {
    debug('#bodyParser'); //debugger flag for body-parser module
    if(request.method !== 'POST' && request.method !== 'PUT') return resolve(request); //if request method isnt POST or PUT, request object is just passed through and resolved

    let message = ''; //empty message string

    request.on('data', data => {
      debug(`Chunked request data: ${data.toString()}`);
      message += data.toString();
    });

    //when data stream ends, we gonna try to parse that message and assign it to request.body, if taht's successful we return and resolve the request
    //if unsuccessful, we catch && reject the error
    //ensures that if there's malformed data, we try and parse it, and if it fails then that gets caught in the catch clause
    request.on('end', () => {
      try {
        request.body = JSON.parse(message);
        debug(`Completed request body: ${request.body}`);
        return resolve(request);
      } catch(err) {
        return reject (err);
      }
    });
 
    //given any error, we return and reject that error
    request.on('error', err => {
      debug(`ERRROR occured on parsing request body: ${err}`);
      return reject(err);
    });
  });
};