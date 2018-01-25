'use strict';

const urlParser = require('url');
const queryString = require('querystring');
const debug = require('debug')('http:url-parser');

module.exports = req => {
    req.url = urlParser.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    return Promise.resolve(req);
};