'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = function(router){
  debug('route envoked');
  
  router.post('/api/v1/note', (req, res) => {
    let note = new Note(req.body.subject, req.body.comment);
    storage.create('note', note)
      .then(storageNote => {
        res.writeHead(201, {'content-Type': 'application/json'});
        res.write(JSON.stringify(storageNote));
        res.end();
      })
      .catch(err =>{
        debug(`#Create error: ${err}`);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });

  router.get('/api/v1/note', (req, res) => {
    let note_id = req.url.query.id;
    storage.fetchOne('note', note_id)
      .then(storageNote => {
        let resStatus = 200;
        let resMesg = JSON.stringify(storageNote);
        let contentType = 'application/json';
        if (!Object.keys(storageNote).length) [resStatus, contentType, resMesg] = [400, 'text/plain', 'Bad Request'];
        res.writeHead(resStatus, {'content-Type': contentType});
        res.write(resMesg);
        res.end();
      })
      .catch(err =>{
        debug(`fetchOne error: ${err}`);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });

  router.put('/api/v1/note', (req, res) => {
   
    let [note_id , noteBody ] = [req.url.query.id, req.body];
    noteBody.id = note_id;
    storage.update('note', note_id, noteBody)
      .then(() => {
        res.writeHead(204, {'content-Type': 'text/plain'});
        res.write();
        res.end();
      })
      .catch(err =>{
        debug(`fetchOne error: ${err}`);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });

  router.delete('/api/v1/note', (req, res) => {
    let note_id = req.url.query.id;
    storage.delete('note', note_id)
      .then(() => {
        res.writeHead(204, {'content-Type': 'text/plain'});
        res.end();
      })
      .catch(err =>{
        debug(`fetchOne error: ${err}`);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Bad Request');
        res.end();
      });
  });

};