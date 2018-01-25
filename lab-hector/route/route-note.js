'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');

//THIS IS FOR THE POST
module.exports = function (router) {

  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(storedNote => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(storedNote));
          res.end();
        });
    } catch (err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
    }
  });

  //THIS IS FOR THE GET
  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');
    if (req.url.query._id) {
      storage.fetchOne('note', req.url.query._id)
        .then(Note => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(Note));
          res.end();
        })
        .catch(err => {
          console.error(err);
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.write('bad request; could not find record');
          res.end();
        });
      return;
    }

    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write('bad request; item id required to get record');
    res.end();
  });



  //THIS IS FOR THE PUT
  router.put('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');

  });

  //THIS IS FOR DELETE
  router.delete('/api/v1/note', (req, res) => {
    debug('DELETE /api/v1/note');

    if (req.url.query._id) {
      storage.delete('note', req.url.query._id)
        .then(Note => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end();
        })
        .catch(err => {
          console.error(err);
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.write('bad request: could not delete note');
          res.end();
        });
    }
  });
};