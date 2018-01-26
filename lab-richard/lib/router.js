'use strict';

const debug = require('debug')('http:Router');
const bodyParser = require('./body-parser');
const urlParser = require('./url-parser');

const Router = module.exports = function() {
    this.routes = {
        GET: {
            // '/api/v1/note': (request, response) => {},
            // '/api/v1/note/:id': (request, response) => {},
        },
        POST: {},
        PUT: {},
        DELETE: {},
    };
};

// ['get', 'post', 'put', 'delete'].map(method => {
//     Router.prototype[method] = function(endpoint, callback) {
//         this.routes[method.toUpperCase()][endpoint] = callback;
//     }
// });

Router.prototype.get = function(endpoint, callback) {
    debug(`#Router: GET ${endpoint} mounted`);
    this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
    debug(`#Router: POST ${endpoint} mounted`);
    this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
    debug(`#Router: PUT ${endpoint} mounted`);
    this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
    debug(`#Router: DELETE ${endpoint} mounted`);
    this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
    return(request, response) => {
        Promise.all([
            urlParser(request),
            bodyParser(request),
        ])
            .then(() => {
                debug('Successfully parsed Body and URL');

                if(typeof this.routes[request.method][request.url.pathname] === 'function') {
                    this.routes[request.method][request.url.pathname](request, response);
                    return;
                }

                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write('Not Found');
                response.end();
                return;

            })
            .catch(err => {
                debug(`There was an error parsing url or body: ${err}`);

                response.writeHead(400, {'Content-Type': 'text/plain'});
                response.write('Bad Request');
                response.end();
                return;
            });
    };
};