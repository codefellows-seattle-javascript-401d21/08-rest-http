'use strict';

const urlParser = require('url'); //require url from nodeJS
const queryString = require('querystring'); //require querystring from NodeJS
const debug = require('debug')('http:url-parser'); //require in debug package

module.exports = function(request) {
  // if(something does not validate) return Promise.reject(an error)
  debug('urlParser');

  request.url = urlParser.parse(request.url); //parse url data
  request.url.query = queryString.parse(request.url.query); //parse querystring data

  return Promise.resolve(request);
};
