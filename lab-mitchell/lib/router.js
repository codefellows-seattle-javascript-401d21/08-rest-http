'use strict';

//3 primary things to do here
//1 create constructer to instantiate new router instance
//2 set up ability for us to add (mount) endpoints and callbacks to router
//3 add router.route() method so that we can get this callback and hand it to http.createServer() so we can build actualy functionality of our application


const debug = require('debug')('http:Router');
const bodyParser = require('./body-parser');
const urlParser = require('./url-parser');

const Router = module.exports = function() { //doesnt take any arguments, just instantiating 
  this.routes = { //this.routes object with the GET POST PUT DELETE that will each have their own objects
    //as we start mounting routes endpoint key callback function to router, as seen below 
    GET: {
      //below is the express way, note the :id piece which is dynamic for all :id's, hardcoded example
      //'/api/v1/note': (req, res) => {},
      // '/api/v1/note/:id': (req, res) => {},
    },
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

//can also use to construct these prototypes
// ['get', 'post', 'put', 'delete'].map(method => {
//   Router.prototype[method] = function(endpoint, callback) {
//    this.routes[method.toUpperCase()][endpoint] = callback
//   }
// })
//gives router ability to say, 'do i know this endpoint for this function? if so, do it's thing'

//app.get accepts two things in express, endpoint/callback like below
Router.prototype.get = function(endpoint, callback) { //endpoint like '/api/v1/note' or '/cowsay'
  debug(`#Router: get ${endpoint} mounted`); //debugger will say 'router mounted a GET request, with this endpoint
  this.routes.GET[endpoint] = callback; 
  //[] [bracket] notation to address as dynamic key, one that doesn't exist yet. can add keys if they don't exist using this method DANK
  //says 'whatver endpoint that gets passed in, will become the new key on this GET object, and will have value of callback'
};

Router.prototype.post = function(endpoint, callback) {
  debug(`#Router: post ${endpoint} mounted`); //debugger will say 'router mounted a POST request, with this endpoint  
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  debug(`#Router: put ${endpoint} mounted`); //debugger will say 'router mounted a PUT request, with this endpoint  
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  debug(`#Router: delete ${endpoint} mounted`); //debugger will say 'router mounted a DELETE request, with this endpoint  
  this.routes.DELETE[endpoint] = callback;
};

//when funciton gets created, creates server instance, generates ability to handle the REQUEST/RESPONSE cycle, so point where middleware comes into play
Router.prototype.route = function() {
  return (req, res) => { //we gonna return a function
    Promise.all([ //passing Promise.all() an array, ensures everything returns a resolve/reject BEFORE MOVING TO THEN/CATCH BLOCK
      urlParser(req), //run the request object thru url parser
      bodyParser(req), //as well as the body parser, BOTH OF WHICH RETURN PROMISES
      //ALL WE SAYING IS THESE TWO PROMISES NEED TO COMPLETE, AND EXPECT TO BE ALL COMPLETED, BEFORE CALLING .then();
    ])
      .then(() => {
        debug('Successfully parsed the Body and URL'); //logs successful parsing of body & url

        //if typeof this (the router instance), since return an arrow function with no lexical scope, checks if we have ENDPOINT AND CALLBACK FUNCTION REGISTERED
        //ensures that if somebody mounts an endpoint with value that is not a callback function, or A function, we don't trigger this thing. saying no you can't do a thing at that route
        if(typeof this.routes[req.method][req.url.pathname] === 'function') { //if typoe of this.routes @ req.method @ req.url.pathname (aka ENDPOINT) is a function, pass it the things
          //go ahead and call the method at that endpoint and pass in (request, response)
          this.routes[req.method][req.url.pathname](req, res); //passes the function (req, res) given to the Router.route() method
          //[req.url.pathname] gets us the endpoint
          return;
        }

        //in event we don't validate above, 404 b/c endpoint path DNE
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not Found');
        res.end();
        return;
      })
      .catch(err => {
        debug(`There was an error parsing the URL or Body: ${err}`); //logs out error object in debugger

        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
        return;
      });
  };
};