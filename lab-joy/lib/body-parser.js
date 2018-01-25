'use strict';

const debug = require('debug')('http:body-parser'); //

module.exports = function (req) {
    return new Promise((resolve, reject) => {
        debug('#bodyParser'); //
        if (req.method !== 'POST' && req.method !== 'PUT') return resolve(req);

        let msg = '';

        req.on('data', data => {
            debug(`Chunked req data: ${data.toString()}`);
            msg += data.toString();
        });

        req.on('end', () => {
            try {
                req.body = JSON.parse(msg);
                debug(`Completed req body: ${req.body}`);
                return resolve(req);
            } catch (err) {
                return reject(err);
            }
        });

        req.on('error', err => {
            debug(`Error occurred on parsing req body: ${err}`);
            return reject(err);
        });
    });
};