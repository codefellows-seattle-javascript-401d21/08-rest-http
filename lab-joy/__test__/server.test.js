'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');
let noteOneID;

describe('Server Module', () => {
    beforeAll(() => server.start(3000));
    afterAll(() => server.close());

    it('[POST] should respond with 201 status', () => {
        return superagent.post(':3000/api/v1/note')
            .send({title: 'note1', content: 'note1 body'})
            .then(res => {
                expect(res.status).toBe(201);
            });
    });

    it('[POST] should return the saved note', () => {
        return superagent.post(':3000/api/v1/note')
            .send({ title: 'note1', content: 'note1 body' })
            .then(res => {
                noteOneID = res.body._id;
                expect(res.body.content).toMatch(/note1 body/);
            });
    });

    it('[POST] should respond with "Bad Request" status if invalid request', () => {
        return superagent.post(':3000/api/v1/note')
            .then()
            .catch(err => {
                expect(err.response.text).toMatch(/Bad Request/);
            });
    });

    it('[GET] should respond with 200 status', () => {
        return superagent.get(`:3000/api/v1/note?_id=${noteOneID}`)
            .then(res => {
                expect(res.status).toBe(200);
            });
    });

    it('[GET] should respond with 400 status if invalid request', () => {
        return superagent.get(`:3000/api/v1/note`)
            .then(res => {
                expect(res.status).toBe(400);
            });
    });

    
});