'use strict';

// Module Dependencies
const debug = require('debug')('http:Router');
const bodyParser = require('./body-parse');
const urlParser = require('./url-parse');

const Router = module.exports = function () {
  this.routes = {
    GET: {
      // '/api/v1/note': (req, res) => {},
      // '/api/v1/note': (req, res) => {},
    },
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

// Streamline/Functional Approach

// ['get', 'post', 'put', 'delete'].map(method => {
//   Router.prototype[method] = function (endpoint, callback) {
//     this.routes[method.toUpperCase()][endpoint] = callback;
//   };
// });


// Longhand/Imperative Approach

Router.prototype.get = function (endpoint, callback) {
  debug(`Router: GET ${endpoint} mounted.`);
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function (endpoint, callback) {
  debug(`Router: POST ${endpoint} mounted.`);
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function (endpoint, callback) {
  debug(`Router: PUT ${endpoint} mounted.`);
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function (endpoint, callback) {
  debug(`Router: DELETE ${endpoint} mounted.`);
  this.routes.DELETE[endpoint] = callback;
};


Router.prototype.route = function () {
  return (req, res) => {
    Promise.all([
      urlParser(req),
      bodyParser(req),
    ])
      .then(() => {
        debug(`Successfully parsed URL and Body`);
        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('Not Found');
        res.end();
        return;

      })
      .catch((err) => {
        debug(`There was an error parsing the URL or Body: ${err}`);
        res.writeHead(400, {'Content-Type':'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  };
};
