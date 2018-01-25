'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = function(router){

  router.post('/api/v1/note', (req, res) =>{
    let note = new Note(req.body.subject, req.body.comment);
    storage.create('note', note)
      .then(storageNote =>{
        res.writeHead(200, {'content-Type': 'text/plain'});
        res.write(JSON.stringify(storageNote));
        res.end();
      })
      .catch(err =>{
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });
};