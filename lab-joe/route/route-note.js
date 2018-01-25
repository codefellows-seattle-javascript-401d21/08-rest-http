'use strict'

const Note = require('../model/note')
const storage = require('../lib/storage')
const debug = require('debug')('http:route-note')


module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note')

    try {
      debugger;
      let newNote = new Note(req.body.title, req.body.content)

      storage.create('Note', newNote)
      .then(storedNote => {
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(storedNote))
        res.end()
      })
    } catch(err) {
      debug(`There was a bad request: ${err}`)
      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write('Bad Request')
      res.end()
    }
  })

  router.get(`/api/v1/note`, (req, res) => {    
    try {
        let getNote = new Note()
        getNote.title = "new title";
        getNote.content = "here is some content"
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(storage.fetchOne(req.url.query.item))
        res.end()
        storage.fetchOne(req.url.query.item);
      } catch(err) {
        debug(`There was a bad request: ${err}`)
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('Bad Request')
        res.end()
      }

  })

//   dont touch
// must be http://localhost:3000/api/v1/note?note=jamedscdsdsdcd
  router.put('/api/v1/note', (req, res) => {
    try {
        let getNote = new Note()
        getNote.title = "new title";
        getNote.content = "here is some content"
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(storage.update(req.url.query,req.url.query.note))
        res.end()
        // storage.fetchOne();
      } catch(err) {
        debug(`There was a bad request: ${err}`)
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('Bad Request')
        res.end()
      }
  })

  router.delete(`/api/v1/note`, (req,res) => {
    try {
        let getNote = new Note()
        getNote.title = "new title";
        getNote.content = "here is some content"
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('success')
        res.end()
        storage.delete(req.url.query.note)
       } catch(err) {
        debug(`There was a bad request: ${err}`)
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('Bad Request')
        res.end()
      }

  })

}