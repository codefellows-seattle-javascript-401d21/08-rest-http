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

Router.prototype.put = function (endpoint, callback) {
  this.routes.PUT[endpoint] = callback
}

Router.prototype.delete = function (endpoint, callback) {
  this.routes.DELETE[endpoint] = callback
}

Router.prototype.route = function () {
  return (req, res) => {
    Promise.all([ //commit to promises at url/body parser requests
      urlParser(req),
      bodyParser(req),
    ])
    .then(() => {
      debug('Successfully parsed the Body and URL')

      if(typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.mehtod][req.url.pathname](req, res)
        return
      }

      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('Not Found')
      res.end()
      return
    })
    .catch(error => {
      debug( `There was an error parsing the URL or Body: ${error}`)

      res.write(400, {'Content-Type': 'text/plain'})
      res.end()
      return
    })
  }
}