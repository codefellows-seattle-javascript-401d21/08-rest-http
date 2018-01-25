'use strict';

const debug = require('debug')('http:Router'); //debug pathname
const bodyParser = require('./body-parser'); //functionality from body-parse.js
const urlParser = require('./url-parser'); //functionality from url-urlParser


const Router = module.exports = function () {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

//Define methods for endpoints
Router.prototype.get = function(endpoint, callback) {
  debug(`Router: GET  ${endpoint} mounted`);
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  debug(`Router: POST  ${endpoint} mounted`);
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  debug(`Router: PUT  ${endpoint} mounted`);
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  debug(`Router: DELETE  ${endpoint} mounted`);
  this.routes.DELETE[endpoint] = callback;
};

//Method using promise to parse the url and body of req
Router.prototype.route = function () {
  return (req, res) => {
    Promise.all([
      urlParser(req),
      bodyParser(req),
    ])
      .then(() => {
        debug('Successfully parsed the Body and URL');

        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }

        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not Found');
        res.end();
        return;
      })
      .catch(err => {
        debug(`There was an error parsing the URL or Body: ${err})`);

        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
        return;
      });
  };
};
