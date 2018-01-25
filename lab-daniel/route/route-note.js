'use strict';

const debug = require('debug')('http:route-notes');
const Note = require('../model/note');
const storage = require('../lib/storage');

module.exports = function (router) {
  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');
    try {
      if (req.url.query._id) {
        storage.fetch('Note', req.url.query._id)
          .then(notes => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(notes));
            res.end();
            return;
          });
      } else {
        storage.fetchAll('Note')
          .then(notes => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(notes));
            res.end();
            return;
          });
      }
    } catch (err) {
      debug(`There was a bad request: ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
      return;
    }
  });
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');
    try {
      let newNote = new Note(req.body.title, req.body.content);
      storage.create('Note', newNote)
        .then(note => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(note));
          res.end();
          return;
        });
    } catch(err) {
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
      newNote._id = req.body._id;
      storage.update('Note', newNote)
        .then(note => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(note));
          res.end();
          return;
        });
    } catch (err) {
      debug(`There was a bad request: ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
      return;
    }
  });
  router.delete('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');
    try {
      storage.delete('Note', req.url.query._id)
        .then(() => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('Note Successfully Deleted');
          res.end();
          return;
        });
    } catch (err) {
      debug(`There was a bad request: ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
      return;
    }
  });  
};