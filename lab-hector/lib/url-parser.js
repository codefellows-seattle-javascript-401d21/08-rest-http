'use strict';

const urlParser = require('url');
const queryString = require('querystring');
const debug = require('debug')('http:url-parser');

// if(something does not validate) return Promise.reject(an error)

module.exports = function (request) {
  debug('#url-parser');

  request.url = urlParser.parse(request.url);
  request.url.query = queryString.parse(request.url.query);

  return Promise.resolve(request);
};

