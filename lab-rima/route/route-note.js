'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = (router) => {

  router.get('/api/v1/note', (req, res) => {
    // if id is passed
    if(req.url.query._id){
      storage.fetchOne('Note', req.url.query._id)
        .then(storageNote => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storageNote));
          res.end();
          return;})
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('Bad Request');
          res.end();
          return;})
    } else {
      storage.fetchAll('Note')
        .then(storageNote => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storageNote));
          res.end();
          return;})
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('Bad Request');
          res.end();
          return;})
    }
  });


  router.post('/api/v1/note', (req, res) => {
    try{ 
      let newNote = new Note(req.body.title, req.body.content);
      storage.create('Note', newNote)
        .then(storageNote => { 
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storageNote));
          res.end();})
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('Bad Request');
          res.end();})
    } catch(err) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(err.message);
      res.end();
    }
  });

  router.put('/api/v1/note', (req, res) => {
    if(req.body){
      storage.update('Note', req.body)
        .then(storageNote => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storageNote));
          res.end();
        })
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('Bad Request');
          res.end();
        })
    } else{
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });

  router.delete('/api/v1/note', (req, res) => {
    if(req.url.query._id){
      storage.delete('Note', req.url.query._id)
        .then(storageNote => {
          res.writeHead(204, {'Content-Type': 'text/plain'});
          res.end();
        })
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('Bad Request');
          res.end();
        })
    } else {
      storage.deleteAll('Note')
        .then(storageNote => {
          res.writeHead(204, {'Content-Type': 'text/plain'});
          res.end();
        })
    }
  });
}
