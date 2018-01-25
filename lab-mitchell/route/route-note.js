'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-node');

module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try { //better practice to put lines 15-19 under current line 26, since we are only looking for error from line 13 in the try block and not looking for error in the storage.create in the try block, SEPARATION OF CONCERNS
      debugger;
      let newNote = new Note(req.body.title, req.body.content); //declares newNote and creates new instance of Note object, passing the title property of the body property of the request, and the content property of the body property of the request

      storage.create('Note', newNote).then(storedNote => { //note is created and passed over to the storage module
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(storedNote));
        res.end();
      });
    } catch(err) { //if error occurs while creating new note
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
    }
  });

  //check out httpie since postman is a little weird or check out tutorials
  router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');
    //if valid query id, where do i get that id from? in req.url.query._id BC OF QUERY/URL PARSER 
    if (req.url.query._id) { //validate that _id property on query property on url property of request exists
      storage.fetchOne('Note', req.url.query._id).then(note => { //call fetchOne storage method 
        res.writeHead(200, {'Content-Type': 'application/json'}); //stored data responds and writes header with status code, and content type of JSON
        res.write(JSON.stringify(note)); //stored data responds and writes the string version of the JSON note 
        res.end();
      }).catch(err => {
        console.log('ran the thing', err.message); 
        if(err.message.includes('400')) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('bad request');
          res.end();
        }
        return;
      });
    }

    storage.fetchAll('Note').then(ids => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(ids));
      res.end();
    }).catch(err => {
      if(err.message.includes('400')) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('bad request');
        res.end();
        return;
      }
    });
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