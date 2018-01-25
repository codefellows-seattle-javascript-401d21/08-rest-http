'use strit';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server Module', function() {
  beforeAll(() => server.start(4000));
  afterAll(() => server.stop());


  //POST
  describe('POST', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.post(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 201 with valid input', () => {
      return superagent.post(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it('Should respond with a single note', () => {
      return superagent.post(`:4000/api/v1/note`)
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.body.content).toBe('pizza');
        });
    });
  });

  //GET
  describe('GET', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.get(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 200 with valid input', () => {
      return superagent.get(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it('Should respond with all notes', () => {
      return superagent.get(':4000/api/v1/note')
        .then(res => {
          expect(JSON.parse(res.text));
        });
    });
  });

  //PUT
  describe('PUT', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.put(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 204 with valid input', () => {
      return superagent.put(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('Should respond a bad request response if invalid query text is sent', () => {
      return superagent.get(':4000/api/v1/note id=')
        .catch(err => {
          expect(err.response.text).toBe('Not Found');
        });
    });
  });

  //DELETE
  describe('DELETE', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.delete(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 204 with valid input', () => {
      return superagent.delete(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
  });
});
