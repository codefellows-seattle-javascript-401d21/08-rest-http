'use strict';

const urlParser = require('url');
const queryString = require('querystring');
const debug = require('debug')('http:url-parser');

module.exports = function(request) { //exporting single anonymous function expecting single request arugment (incoming request object)

  //either gonna parse and give you the data or the data disn't exist to parse, so just gonna give you empty obj or strings
  //so don't really need to do error/reject handling in this case
  request.url = urlParser.parse(request.url); //parse url
  request.url.query = queryString.parse(request.url.query); //parse querystring

  return Promise.resolve(request); //make sure this is done, resolve it, and .then() do the next thing
};