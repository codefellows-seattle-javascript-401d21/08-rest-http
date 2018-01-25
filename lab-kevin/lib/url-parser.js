'use strict';

const debug = require('debug')('http:url-parser');
const  url_parser = require('url');
const query_parser = require('querystring');

module.exports = function(request) {
  debug('#url parse');
  request.url = url_parser(request.url);
  request.url.query = query_parser(request.url.query);
  return Promise.resolve(request);
};
