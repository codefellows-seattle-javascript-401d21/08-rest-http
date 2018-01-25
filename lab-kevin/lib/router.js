'use strict';

const  body_parser = require('./body-parser');
const  url_parser = require('./url-parser');
const  debug = require('debug')('http:route-constructor');

const Router = module.exports = function (){
  debug('#New Router');
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE:{},
  };

};

['get', 'post', 'put', 'delete'].map(mthd => {
  debug(`router method ${mthd}`);
  Router.prototype[mthd] = function(rute, cb){this.routes[mthd.toUpperCase()][rute] = cb;};
});

Router.prototype.route = function(){
  return (req, res) => {
    Promise.all([
      url_parser(req),
      body_parser(req),
    ])
      .then(() =>{

        let routeProcess = this.routes[req.method][req.url.pathname];
        if( typeof routeFunction === 'function') return routeProcess(req, res);
        
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not Found');
        res.end();
        return;
      })
      .catch(err =>{
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
        return;
      });
  };
};



