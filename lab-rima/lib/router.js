'use strict';

const debug = require('debug')('http:Router');
const urlParser = require('./url-parser');
const bodyParser = require('./body-parser');


const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

// thise get called in route() when a right request to a existing route is sent
Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

// this actually routes requests
Router.prototype.route = function(){
  return (req, res) => {

    Promise.all([
      urlParser(req),
      bodyParser(req),
    ])
      .then(() => {
        debug('Successfully parsed the Body and URL');

        // if the route exists in router object, then call callback
        if(typeof this.routes[req.method][req.url.pathname] === 'function'){
          this.routes[req.method][req.url.pathname](req, res);
          return;
        } else {
          // if the route doesn't exist, then return 404
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write('Not Found');
          res.end();
          return;
        }
      })
      .catch(err => {
        debug(`There was an error parsing the URL or Body: ${err}`);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
        return;
      });
  };
};
