'use strict';

const Note = require('../model/note'); //functionality in note.js
const storage = require('../lib/storage'); //functionality in storage.js
const debug = require('debug')('http:route-note'); //debug package

module.exports = function(router) {
  //from demo, route for post request
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote) //'Note' is the key on my memory object
        .then(storedNote => {
          debug('Note');
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
        });
    } catch (err) {
      debug(`'There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });

  router.get('/api/v1/note', (req, res) =>  {
    debug('GET /api/v1/note');

    try {
      storage.fetchAll('Note') //use the key
        .then(getAll => {
          debug('all data', getAll);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(getAll));
          res.end();
        });
    } catch (err) {
      debug(`There was a bad request: ${err}`);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad GET Request');
      res.end();
    }
  });

  router.put('/api/v1/note', (req, res) =>  {
    debug('PUT /api/v1/note');

    try {
      let updatedNote = new Note(req.body.title, req.body.content);

      updatedNote._id = req.body._id; //this the ID back to original
      debug('original ID', updatedNote._id);
      storage.update('Note', updatedNote) //'Note' is the key on my memory object
        .then(reStoredNote => {
          res.writeHead(203, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(reStoredNote));
          res.end();
        });
    } catch (err) {
      debug(`There was a bad PUT request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
  //
  // router.delete('/api/v1/note', (req, res) =>  {
  //
  // });

};
