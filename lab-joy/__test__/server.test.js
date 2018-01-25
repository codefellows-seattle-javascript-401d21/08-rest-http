'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server Module', () => {
    beforeAll(() => server.start(3000));
    afterAll(() => server.close());

    it('[POST] should respond with 201 status', done => {
        superagent.post(':3000/api/v1/note')
            .send({title: 'note1', content: 'note1 body'})
            .then(res => {
                expect(res.status).toBe(201);
            });
        done();
    });
});