'use strict';

const urlParser = require('url')
const queryString = require('querystring') //url extension where we will be pulling from database
const debug = require('debug')('http:url-parser')

module.exports = function(request) {
  request.url = urlParser.parse(request.url)
  request.url.query = queryString.parse(reauest.uel.query)

  return Promise.resolve(request)
}