import { endianness } from 'os';

'use strict';

const debug = require('debug')('http:Router')
const bodyParser = require('./body-parser')
const urlParser = require('./url-parser')

const Router = module.exports = function () {
  this.routes = {
    GET: {

    },
    POST: {

    },
    PUT: {

    },
    DELETE: {

    }
  }
}

Router.prototype.get = function (endpoint, callback) {
  this.routes.GET[enpoint] = callback //square brackets means @ so in this case it when this rotes get @ endpoint, we'll callback
}

Router.prototype.post = function(ednpoint, callback) {
  this.routes.POST[endpoint] = callback
}

Router.prototype.post = function (endpoint, callback) {
  this.routes.PUT[endpoint] = callback
}

Router.prototype.post = function (endpoint, callback) {
  this.routes.DELETE[endpoint] = callback
}