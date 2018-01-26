'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/api/v1/note', (req,res) => {
    debug('POST /api/v1/note');

    try {
      
      let newNote = new Note (req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(storedNote => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
        });
    } catch(err) {
      debug('There was a bad request: ${err}');

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
  
  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');

    try {
      if (req.url.query._id){
        storage.fetchOne('Note', req.url.query._id)
          .then(storedNote => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(storedNote));
            res.end();
            return;
          });
      } else {
        storage.fetchAll('Note')
          .then(storedNote => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(storedNote));
            res.end();
            return;
          });
      }
    } catch (err) {
      debug(`There was a bad request: ${err}`);
      if (err.message.startsWith('400')) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
        return;
      }
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
    }
  });

  router.put('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');
    try {
      let newNote = new Note(req.body.title, req.body.content);
      newNote._id = req.body.id;
      storage.update('Note', newNote)
        .then(item => {
          res.writeHead(202, {'Content-Type': 'application/json'});
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
    debug('delete /api/v1/note');
    storage.delete('Note', req.url.query.id)
      .then(item => {
        res.writeHead(204, {'Content-Type': 'text/plain'});
        res.end();
      })
      .catch(err => {
        debug(`There was a bad request: ${err}`);
        console.log('inside catch');
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });

};