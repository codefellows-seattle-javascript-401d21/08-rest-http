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
      it('should respond with a bad request', () => {
        return superagent.post(':4444/api/v1/note')
          .send({ title: 'hello', content: 'world yas' })
          .then()
          .catch(err => {
            expect(err.response.text).toMatch(/Bad Request/)
          });
      });
      it('should return a item object with these properties', () => {
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
            expect(res.status).toBe(200);
          });
      });
      it('should return an item object with these keys', () => {
        return superagent.get(':4444/api/v1/note?_id=' + generatedNote._id)
          .then(res => {
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('content');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toBeInstanceOf(Object);
          });
      });
      it('should return an item object with these values', () => {
        return superagent.get(':4444/api/v1/note?_id=' + generatedNote._id)
          .then(res => {
            expect(res.body._id).toMatch(generatedNote._id);
            expect(res.body.content).toMatch(/world yas/);
            expect(res.body.title).toMatch(/hello/);
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });

  describe('Valid Request to the API', () => {
    describe('PUT /api/v1/note', () => {
      it('Should respond with a status 200', () => {
        return superagent.put(`:4444/api/v1/note`)
          .send({_id: generatedNote._id, title: 'test 2', content: 'new test 2'})
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
      it('Should respond with a single note', () => {
        return superagent.get(`:4444/api/v1/note?_id=${generatedNote._id}`)
          .then(res => {
            expect(JSON.parse(res.text).title).toBe('test 2');
          });
      });
      it('Should respond a bad request response if invalid query text is sent', () => {
        return superagent.get(`:4444/api/v1/note?_id=`)
          .catch(err => {
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });
    });
  });

  describe('DELETE /api/v1/note', () => {
    it('Should respond with a single note', () => {
      return superagent.get(`:4444/api/v1/note?_id=${generatedNote._id}`)
        .then(res => {
          expect(JSON.parse(res.text).title).toBe('test 2');
        });
    });
    it('Should delete that note with a status 204', () => {
      return superagent.del(`:4444/api/v1/note?_id=${generatedNote._id}`)
        .then(res => {
          expect(res.status).toBe(204);
          expect(res.text).toMatch(/Deleted/);
        })
        .catch(err => {
          expect(err.status).toMatch('Bad Request');
        });
    });
    it('Should respond a bad request response if no query text is sent', () => {
      return superagent.del(`:4444/api/v1/note?_id=${generatedNote._id}`)
        .catch(err => {
          expect(err.response.text).toMatch(/Bad Request/);
        });
    });
  });

});