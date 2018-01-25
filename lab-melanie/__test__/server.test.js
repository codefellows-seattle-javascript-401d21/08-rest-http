'use strict';

// Testing Dependencies
const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('ServerIntegration Testing', function() {
  beforeAll(() => server.start(4000));
  afterAll(() => server.stop());

  describe('Valid requests', () => {
    describe('POST /api/v1/note', () => {

    });
    describe('GET /api/v1/note', () => {

    });
    describe('GET /api/v1/note?_id<record id>', () => {

    });
  });

  describe('Invalid requests', () => {

  });
});

describe('Server Module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('POST', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.post(':4444/api/v1/note')
        .catch(err => {
          expect(err.response.text).toBe('Bad Request');
        });
    });
    it('should respond with valid context in body', () => {
      return superagent.post(':4444/api/v1/note')
        .send({title: 'one', content: 'hello'})
        .then(res => {
          expect(res.body.content).toBe('hello');
        });
    });
    it('should respond with a status 201 with valid input', () => {
      return superagent.post(':4444/api/v1/note')
        .send({title: 'two', content: 'hola'})
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
  describe('GET', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.get(':4444/api/v1/note')
        .catch(err => {
          expect(err.response.text).toBe('Bad Request');
        });
    });
    it('Should respond with all notes', () => {
      return superagent.get(':4444/api/v1/note')
        .then(res => {
          expect(JSON.parse(res.text));
        });
    });
    it('should respond with a status 200 with valid input', () => {
      return superagent.get(':4444/api/v1/note')
        .send({title: 'two', content: 'hola'})
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
  describe('PUT', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.put(':4444/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 204 with valid input', () => {
      return superagent.put(':4444/api/v1/note')
        .send({title: 'three', content: 'hello'})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('Should respond a bad request response if invalid query text is sent', () => {
      return superagent.put(':4444/api/v1/note id=')
        .catch(err => {
          expect(err.response.text).toBe('Bad Request');
        });
    });
  });
  describe('DELETE', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.delete(':4444/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 204 with valid input', () => {
      return superagent.delete(':4444/api/v1/note')
        .send({title: 'four', content: 'hello'})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
  });
});