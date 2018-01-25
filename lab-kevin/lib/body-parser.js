'use strict';

const debug = require('debug')('http:body-parser');

module.exports = function(request) {
  debug('#Request parse');
  return new Promise((resolve, reject) => {
    if (request.method === 'GET') return resolve(request);
    let mesg = '';
    request.on('data', data => mesg += data.toString());
    request.on('end', () => {
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