'use strict';

const Note = require('../model/note')
const storage = require('../lib/storage.js')
const debug = require('debug')('http:route-note')

module.exports = function (router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/vi/note') //modulize url path

    try {
      debugger;
      let newNote = new Note(req.body.title, req.body.content) //dynamcially creating html elements

      sotrage.create('Note', newNote)
      .then(storedNote => {
        res.writeHead(201, {'Content-Type': 'applicatino/json'})
        res.write(JSON.stringify(storedNote))
        res.end() //storing note somewhere not sure where or why
      })
    } catch (error){
      debug(`There was a bad requests: ${err}`)

      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write('Bad Request')
      res.end()
    }
  })
  router.get('api/v1/note', (req, res) => {//rout to path
    
  })
  router.put('api/v1/note', (req, res) => {

  })
  router.delete('api/v1/note', (req, res) => {

  })
}