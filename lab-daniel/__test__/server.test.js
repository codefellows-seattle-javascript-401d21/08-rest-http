'use strict';

// Testing Dependencies
const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let idHolder, api = ':3000/api/v1/note';

describe('Server module', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('POST /api/v1/notes', () => {
      it('Should respond with a bad request if bad data is sent', () => {
        return superagent.post(api)
          .catch(err => {
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });
      it('Should respond with a status of 200', () => {
        return superagent.post(api)
          .send({title: 'test 1', content: 'this is the first test'})
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('Should post a single note and return it', () => {
        return superagent.post(api)
          .send({title: 'test 2', content: 'this is the second test'})
          .then(res => {
            idHolder = res.body._id;
            expect(res.body.title).toMatch(/test 2/);
          });
      });
    });
    describe('GET /api/v1/note', () => {
      it('Should respond with a status 200', () => {
        return superagent.get(api)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('Should respond with all notes', () => {
        return superagent.get(api)
          .then(res => {
            expect(JSON.parse(res.text));
          });
      });
      it('Should respond with a single note', () => {
        return superagent.get(`${api}?_id=${idHolder}`)
          .then(res => {
            expect(JSON.parse(res.text).title).toBe('test 2');
          });
      });
      it('Should respond a bad request response if no query text is sent', () => {
        return superagent.get(`${api}?_id`)
          .catch(err => {
            console.log(err.response);
            
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });
    });
    describe('PUT /api/v1/note', () => {
      it('Should respond with a status 200', () => {
        return superagent.put(api)
          .send({_id: idHolder, title: 'test 2', content: 'updated test 2 - attempt 1'})
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('Should respond with a single note', () => {
        return superagent.get(`${api}?_id=${idHolder}`)
          .then(res => {
            expect(JSON.parse(res.text).title).toBe('test 2');
          });
      });
      it('Should respond a bad request response if invalid query text is sent', () => {
        return superagent.get(`${api}?_id=`)
          .catch(err => {
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });
    });
    describe('DELETE /api/v1/note', () => {
      it('Should respond with a status 200', () => {
        return superagent.del(`${api}?_id=${idHolder}`)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toMatch(/Successfully Deleted/);
          });
      });
      it('Should respond a bad request response if no query text is sent', () => {
        return superagent.del(`${api}?_id=${idHolder}`)
          .catch(err => {
            console.error(err.response);
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });
    });
  });
});