'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = (router) => {


  router.post('/api/v1/note', (req, res) => {


    try{
      
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(storageNote => { 
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storageNote));
          res.end();
        });
    } catch(err) {

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });  

  router.get('/api/v1/note', (req, res) => {
    try{
      if(req.url.query._id){
        storage.fetchOne('Note', req.url.query._id)
          .then(storageNote => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(storageNote));
            res.end();
          });
      } else {
        storage.fetchAll('Note')
          .then(storageNote => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(storageNote));
            res.end();
          });
      }
    } catch(err) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });

  router.put('/api/v1/note', (req, res) => {

    try{

      storage.update('Note', req.body)
        .then(storageNote => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storageNote));
          res.end();
        });
    } catch(err) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });

  router.delete('/api/v1/note', (req, res) => {

    try{

      storage.delete('Note', req.url.query._id)
        .then(storageNote => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write('The note was deleted.');
          res.end();
        });
    } catch(err) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
};
