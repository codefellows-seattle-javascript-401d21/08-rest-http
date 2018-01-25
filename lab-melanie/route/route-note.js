'use strict';

const Note = require('../model/note.js');
const storage = require('../lib/storage.js');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note')

    try {
      
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(item => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(item));
          res.end();
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });

  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');

    // if the request includes a unique id
    if(req.url.query._id){
      storage.fetchOne('Note', req.url.query._id)
        .then(note => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(note));
          res.end();
        })
        .catch(err => {
          if(err.message.includes('400')) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write('Bad Request');
            res.end();
          }
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write('Not Found');
          res.end();
        });
      return;
    }
    // if the request does not specify a unique id
    storage.fetchAll('Note')
      .then(item => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(item));
        res.end();
      })
      .catch(err => {
        if(err.message.includes('400')) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('Bad Request');
          res.end();
        }
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not Found');
        res.end();
      });
   

  });

  router.put('/api/v1/note', (req, res) => {
    debug(`PUT /api/v1/note`);

    try {

      let newNote = new Note(req.body.title, req.body.content);
      
      newNote._id = req.body.id;

      storage.update('Note', newNote)
        .then(item => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(item));
          res.end();
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }

  });

  router.delete('/api/v1/note', (req, res) => {
    debug('DELETE /api/v1/note');
    
    try {
      storage.delete('Note', req)
        .then(item => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(item));
          res.end();
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
};