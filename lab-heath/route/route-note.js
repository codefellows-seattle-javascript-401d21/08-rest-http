'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');
    
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
    if (req.url.query._id) {
      storage.fetchOne('Note', req.url.query._id)
        .then(note => {
          res.writeHead(200, {'content-type': 'appliction/jason'});
          res.write(JSON.stringify(note));
          res.end();
        })
        .catch (err => {
          if (err.message.startsWith('400')) {
            res.writeHead(400, {'Content-type': 'text/plain'});
            res.write('bad request');
            return;
          }
          res.writeHead(404, {'Content-type': 'text/plain'});
          res.write('Not found');
          res.end();
        });
      return;
    }

    storage.fetchAll('Note')
      .then(ids => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(ids));
        res.end();
      })
      .catch(err => {
        if(err.message.startsWith('400')) {
          res.writeHead(400, {'Content-type': 'text/plain'});
          res.write('bad request');
          res.end();
          return;
        }

        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });


  router.put('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');
    try {
      let newNote = new Note(req.body.title, req.body.content);
      newNote._id = req.body.id;
      storage.update('Note', newNote)
        .then(storedNote => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
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
    debug('this is a test of stuff',req.url);
    storage.delete('Note', req.url.query.id)
      .then(item => {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(item));
        res.end();
      })
      .catch(err => {
        debug(`There was a bad request: ${err}`);

        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });
};