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
    if(req.url.query._id) {
      debug('req id inside get',req.url.query._id);
      // try {
      storage.fetchOne('Note', req.url.query._id)
        .then(oneNote => {
          debug('Fetch One', oneNote);
          res.writeHead(200, {'COntent-Type': 'application/json'});
          res.write(JSON.stringify(oneNote));
          res.end();
          return;
        })

        .catch((err) =>  {
          // debug('error from get', err);
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('Note not found');
          res.end();

        });
      return;
    }

    storage.fetchAll('Note')
      .then(oneNote => {
        debug('one note', oneNote);
        res.writeHead(200, {'COntent-Type': 'application/json'});
        res.write(JSON.stringify(oneNote));
        res.end();
      })
      .catch(err  => {
        debug('error from get', err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Note not found');
        res.end();
      });
  });

  router.put('/api/v1/note', (req, res) => {
    debug('request in update', req.body);

    try {
      let replaceNote = new Note(req.body.title, req.body.content);
      replaceNote.id = req.url.query._id;
      debug('updated note before sending to storage', replaceNote);

      storage.update('Note', replaceNote)

        .then(oneNote => {
          debug('one note', oneNote);
          res.writeHead(200, {'COntent-Type': 'text/plain'});
          res.write('Note Ammended');
          res.end();
        });

    } catch(err) {
      debug('error from update', err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Note not found');
      res.end();
    }

  });

  router.delete('/api/v1/note', (req, res) => {
    debug('in delete on route note', req.url.query._id);
    try {
      storage.delete('Note', req.url.query._id)

        .then(oneNote => {
          debug('one note', oneNote);
          res.writeHead(201, {'COntent-Type': 'text/plain'});
          res.write('Note Deleted');
          res.end();
        });

    } catch(err) {
      debug('error from delete');
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Note not found');
      res.end();
    }

  });
};
