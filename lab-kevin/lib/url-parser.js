'use strict';

const debug = require('debug')('http:url-parser');
const  url_parser = require('url');
const query_parser = require('querystring');

module.exports = function(request) {
  debug('#url parse');
  request.url = url_parser.parse(request.url);
  request.url.query = query_parser.parse(request.url.query);
  return Promise.resolve(request);
};
