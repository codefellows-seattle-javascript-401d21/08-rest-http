'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/api/v1/note', (req,res) => {
    debug('POST /api/v1/note');

    try {
      
      let newNote = new Note (req.body.title, req.body.content);
      // console.log(newNote);

      storage.create('Note', newNote)
        .then(storedNote => {
          // console.log('inside .then strorage.create', storedNote);
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
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
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

  router.delete('api/v1/note', (req, res) => {
    debug('delete /api/v1/note');
    try {
      let newNote = new Note(req.body.title, req.body.content);
      newNote._id = req.body.id;
      storage.delete('Note', newNote)
        .then(item => {
          res.writeHead(203, {'Content-Type': 'text/plain'});
          res.write('delete successful');
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