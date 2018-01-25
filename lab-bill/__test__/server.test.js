'use strict';


const superagent = require('superagent');
const server = require('../lib/server');

describe('POST', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());
  describe('Valid', () => {
    it('should respond with a status 201', () => {
      return superagent.post(`:3000/api/v1/note`)
        .send({title: 'Dune', content: 'this is the content'})
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it('should respond with the body we sent', () => {
      return superagent.post(`:3000/api/v1/note`)
        .send({title: 'Dune', content: 'this is the content'})
        .then(res => {
          expect(res.body.title).toBe('Dune');
        });
    });
  });
  describe('Invalid', () => {
    it('should respond with a status 400 if no body is given', () => {
      return superagent.post(`:3000/api/v1/note`)
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
  });
});
describe('GET', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());
  describe('Valid', () => {
    it('should respond with a status 200', () => {
      return superagent.get(`:3000/api/v1/note`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it('should respond with the body we sent', () => {
      return superagent.get(`:3000/api/v1/note`)
        .then(res => {
          expect(res.text.includes('Dune')).toBe(true);
        });
    });
  });
  describe('Invalid', () => {
    it('should respond with a status 404 if invalid get path', () => {
      return superagent.get(`:3000/ai/v1/note`)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});
describe('PUT', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());
  describe('Valid', () => {
    it('should respond with a status 202', () => {
      return superagent.put(`:3000/api/v1/note`)
        .send({title: 'Hello', content: 'put request'})
        .then(res => {
          expect(res.status).toBe(202);
        });
    });
    it('should respond with the body we sent', () => {
      return superagent.put(`:3000/api/v1/note`)
        .send({title: 'Hello', content: 'put request'})
        .then(res => {
        
          expect(res.body.title).toBe('Hello');
        });
    });
  });
  describe('Invalid', () => {
    it('should respond with a status 400 if no body is given', () => {
      return superagent.put(`:3000/api/v1/note`)
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
  });
});
describe('DELETE', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());
  describe('Valid', () => {
    it('should respond with a status 201', () => {
      return superagent.delete(`:3000/api/v1/note`)
        .send({title: 'Dune', content: 'this is the content'})
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it('should respond with the body we sent', () => {
      return superagent.delete(`:3000/api/v1/note`)
        .send({title: 'Dune', content: 'this is the content'})
        .then(res => {
          expect(res.body.title).toBe('Dune');
        });
    });
  });
  describe('Invalid', () => {
    it('should respond with a status 400 if no body is given', () => {
      return superagent.delete(`:3000/api/v1/note`)
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
  });
});