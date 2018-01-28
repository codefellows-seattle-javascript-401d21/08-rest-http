'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');

// This actually defines all routes in router instance
module.exports = function(router){

  router.get('/api/v1/note', (req, res) => {
    // if id is passed
    if(req.url.query._id){
      storage.fetchOne('Note', req.url.query._id)
      .then(note => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
//        return;
        })
      .catch(err => {
        // deals with custom error
        if(err.message.startsWith('400')){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write(err.message);
          res.end();
          return;
        }
        // otherwise
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write(err.message);
        res.end();
      });
      return;
    }
    // if id isn't passed, fetch all
    storage.fetchAll('Note')
      .then(ids => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(ids));
        res.end();
//        return;
      })
      .catch(err => {
        // deals with custom error
        if(err.message.startsWith('400')){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write(err.message);
          res.end();
          return;
        }
        // otherwise
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write(err.message);
        res.end();
//        return;
      });
  });


  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    let newNote;

    try {
      newNote = new Note(req.body.title, req.body.content);
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(err.message);
      res.end();
      return;
    }

    storage.create('Note', newNote)
    .then(storedNote => {
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(storedNote));
      res.end();
//      return;
    })
    .catch(err => {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(err.message);
      res.end();
//      return;
    });
  });

      

  router.put('/api/v1/note', (req, res) => {
    if(req.url.query._id){
      storage.update('Note', req.url.query._id, req.body)
      .then(() => {
        res.writeHead(204);
        res.write('Updated');
        res.end();
//        return;
      })
      .catch(err => {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(err.message);
        res.end();
//        return;
      })
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(err.message);
    res.end();
//    return;
  });

  router.delete('/api/v1/note', (req, res) => {
    // if id is passed
    if(req.url.query._id){
      storage.deleteOne('Note', req.url.query._id)
      .then(()=> {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Deleted');
        res.end();
//        return;
        })
      .catch(err => {
        // deals with custom error
        if(err.message.startsWith('400')){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write(err.message);
          res.end();
          return;
        }
        // otherwise
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write(err.message);
        res.end();
        return;
      })
    }
    // if id isn't passed, fetch all
    storage.deleteAll('Note')
      .then(() => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('All deleted');
        res.end();
//        return;
      })
      .catch(err => {
        // deals with custom error
        if(err.message.startsWith('400')){
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write(err.message);
          res.end();
          return;
        }
        // otherwise
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write(err.message);
        res.end();
//        return;
      });
  });
};
