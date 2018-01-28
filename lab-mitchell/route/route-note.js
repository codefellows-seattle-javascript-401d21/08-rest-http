'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-node');

module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      debugger;
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote).then(storedNote => {
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

  //check out httpie since postman is a little weird or check out tutorials
  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');

    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write('Bad Request');
    res.end();
  });

  router.put('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');

    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write('Bad Request');
    res.end();
  });

  // use note_id to delete
  router.delete('/api/v1/note', (req, res) => {
    debug('DELETE /api/v1/note');

    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write('Bad Request');
    res.end();
  });
};