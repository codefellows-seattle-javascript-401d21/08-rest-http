'use strict';

// Module Dependencies
const urlParser = require('url');
const queryString = require('querystring');

// Url String Parser (URL & Query Strings)
module.exports = function (request) {
  request.url = urlParser.parse(request.url);
  request.url.query = queryString.parse(request.url.query);

  return Promise.resolve(request);
};
