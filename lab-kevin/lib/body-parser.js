'use strict';

const debug = require('debug')('http:body-parser');

module.exports = function(request) {
  
  return new Promise((resolve, reject) => {
    debug('#Request parse');
    //if (request.method === 'GET') return resolve(request);
    if (request.method !== 'GET' && request.method !== 'POST') return resolve(request);
    let mesg = '';
    request.on('data', data => mesg += data.toString());
    request.on('end', () => {
      debug(`mesg: ${mesg}`);
      try {
        if(mesg) request.body = JSON.parse(mesg);
        return resolve(request);
      }
      catch(e) {
        return reject(e);
      }
    });
    request.on('error', err => reject(err));
  });

};