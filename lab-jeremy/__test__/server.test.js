'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');


describe('Server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  let generatedNote = {};

  describe('Valid Request to the API', () => {
    describe('POST /api/v1/note', () => {
      it('should respond with a status 200', () => {
        return superagent.post(':4444/api/v1/note')
          .send({ title: 'hello', content: 'world yas' })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('should return a item object', () => {
        return superagent.post(':4444/api/v1/note')
          .send({ title: 'hello', content: 'world yas' })
          .then(res => {
            generatedNote = res.body; //STORE FOR LATER GET
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('content');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });
  
  describe('Valid Request to the API', () => {
    describe('GET /api/v1/note', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/api/v1/note?_id=' + generatedNote._id)
          .then(res => {
            console.log(res.status);
            expect(res.status).toBe(200);
          });
      });
      it('should return an item object object', () => {
        return superagent.get(':4444/api/v1/note?_id' + generatedNote._id)
          .then(res => {
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('content');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });
});