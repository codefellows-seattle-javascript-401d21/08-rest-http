'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');

module.exports = (router) => {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(storedNote => {
          res.writeHead(201, {'Content-Type': 'application/json'});
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

  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');
    
    try {
      // If an _id was provided fetch that specific note
      if (req.url.query._id) {
        storage.fetchOne('Note', req.url.query._id)
          .then(note => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.write(JSON.stringify(note));
            res.end();
            return;
          });
      }

      // No _id, fetch them all
      storage.fetchAll('Note')
        .then(notes => {
          res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
          res.write(JSON.stringify(notes));
          res.end();
          return;
        });
    } catch (err) {
      // Ooops
      debug(`Bad Request: ${err}`);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
    }
  });

  router.put('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');
    // TODO: implement me
  });

  router.delete('/api/v1/note', (req, res) => {
    debug('DELETE /api/v1/note');
    // TODO: implement me
  });
};

