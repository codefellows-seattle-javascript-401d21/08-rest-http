'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
    router.post('/api/v1/note', (request, response) => {
        debug('POST /api/v1/note');

        try {
            let newNote = new Note(request.body.title, request.body.content);

            storage.create('Note', newNote)
                .then(storedNote => {
                    response.writeHead(201, {'Content-Type': 'application/JSON'});
                    response.write(JSON.stringify(storedNote));
                    response.end();
                });
        }   catch(err) {
            debug(`There was a bad request: ${err}`);

            response.writeHead(400, {'Content-Type': 'text/plain'});
            response.write('Bad Request');
            response.end();
        }
    });

    router.get('/api/v1/note', (request, response) => {
        debug('GET /api/v1/note');

        try {
            if(request.url.query._id) {
                storage.fetchOne('Note', request.url.query._id)
                    .then(note => {
                        response.writeHead(200, {'Content-Type':'application/json'});
                        response.write(JSON.stringify(note));
                        response.end();
                    });
            } else {
                storage.fetchAll('Notes')
                    .then(notes => {
                        response.writeHead(200, {'Content-Type':'application/json'});
                        response.write(JSON.stringify(notes));
                        response.end();
                    });
            }
        }   catch(err) {
            if(err.message.startsWith(400)) {
                response.writeHead(400, {'Content-Type':'text/plain'});
                response.write('Not Found');
                response.end();
                return;
            }
        }
    });

    router.put('/api/v1/note', (request, response) => {
        debug('PUT /api/v1/note');
    
        try {
            let newNote = new Note(request.body.title, request.body.content);
            newNote._id = request.body._id;

            storage.update('Note', newNote)
                .then(() => {
                    response.writeHead(204, {'Content-Type':'text/plain'});
                    response.write('Updated');
                    response.end();
                });
        }   catch(err) {
            debug(`There was a bad request: ${err}`);

            response.writeHead(400, {'Content-Type':'text/plain'});
            response.write('Update Unsuccessful');
            response.end();
        }
    });

    router.delete('/api/v1/note', (request, response) => {
        debug('DELETE /api/v1/note');

        try {
            storage.delete('Note', request.url.query._id)
                .then(() => {
                    response.writeHead(204, {'Content-Type':'text/plain'});
                    response.write('Note Deleted');
                    response.end();
                });
        }   catch(err) {
            debug(`There was a bad request: ${err}`);

            response.writeHead(400, {'Content-Type':'text/plain'});
            response.write('Delete Unsuccessful');
            response.end();
        }
    });
};