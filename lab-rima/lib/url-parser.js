'use strict';

const urlParser = require('url');
const queryString = require('querystring');
const debug = require('debug')('http:url-parser');


module.exports = function(request){
//  console.log('request.url in url parser');
//  console.log(request.url);
  //console.log(request.url.query);

  request.url = urlParser.parse(request.url);
  request.url.query = queryString.parse(request.url.query);

  //console.log(request);
  return Promise.resolve(request);
};

