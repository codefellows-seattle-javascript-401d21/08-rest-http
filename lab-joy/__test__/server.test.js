'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');
let noteTwoID;

describe('Server Module', () => {
    beforeAll(() => server.start(3000));
    afterAll(() => server.close());

    it('[POST] should respond with 201 status', () => {
        return superagent.post(':3000/api/v1/note')
            .send({title: 'note1', content: 'note1 body'})
            .then(res => {
                expect(res.status).toBe(201);
            })
            .catch(err => console.error(err));
    });

    it('[POST] should return the saved note', () => {
        return superagent.post(':3000/api/v1/note')
            .send({ title: 'note2', content: 'note2 body' })
            .then(res => {
                noteTwoID = res.body._id;
                expect(res.body.content).toMatch(/note2 body/);
            })
            .catch(err => console.error(err));
    });

    it('[POST] should respond with status 400 "Bad Request" status if invalid request', () => {
        return superagent.post(':3000/api/v1/note')
            .then(res => (res))
            .catch(err => {
                expect(err.status).toBe(400);
                expect(err.response.text).toMatch(/Bad Request/);
            });
    });

    it('[GET] should respond with 200 status', () => {
        return superagent.get(`:3000/api/v1/note?_id=${noteTwoID}`)
            .then(res => {
                expect(res.status).toBe(200);
            })
            .catch(err => console.error(err));
    });

    it('[GET] should respond with the note specified by the ID', () => {
        return superagent.get(`:3000/api/v1/note?_id=${noteTwoID}`)
            .then(res => {
                expect(res.body.content).toMatch(/note2 body/);
            })
            .catch(err => console.error(err));
    });

    it('[GET] should return all notes if no ID specified', () => {
        return superagent.get(`:3000/api/v1/note`)
            .then(res => {
                let result = JSON.parse(res.text);
                expect(typeof result).toBe('object');

                let note2 = result[Object.keys(result)[1]];
                expect(note2.content).toMatch(/note2 body/);
            })
            .catch(err => console.error(err));
    });

    it('[GET] should respond with 404 status if invalid path', () => {
        return superagent.get(`:3000/api/v1/cats`)
            .then(res => (res))
            .catch(err => {
                expect(err.status).toBe(404);
            });
    });

    it('[PUT] test 200', () => {
        
    });

    it('[PUT] test 400', () => {

    });

    it('[DELETE] test 200', () => {

    });

    it('[DELETE] test 400', () => {

    });

    

    
});