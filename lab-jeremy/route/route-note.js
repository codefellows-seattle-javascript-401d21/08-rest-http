'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      // debugger;
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
      if (req.url.query._id) {
        storage.fetchOne('Note', req.url.query._id)
          .then(notes => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(notes));
            res.end();
          });
      } else {
        storage.fetchAll('Note')
          .then(notes => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(notes));
            res.end();
          });
      }
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });

  router.put('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      // debugger;
      let newNote = new Note(req.body.title, req.body.content);
      newNote._id = req.body._id;
      storage.update('Note', newNote)
        .then(() => {
          res.writeHead(204, {'Content-Type': 'text/plain'});
          res.write('Updated');
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
    console.log(this)
    try {
      // debugger;
      console.log(this)
      storage.delete('Note', req.url.query._id)
        .then(() => {
          console.log('NO ERROR')
          res.writeHead(204, {'Content-Type': 'text/plain'});
          res.write('Deleted');
          res.end();
        });
    } catch(err) {
      console.log(this)
      console.log('ERROR')
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
};
