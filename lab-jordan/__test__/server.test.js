'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');

let path = ':3000/api/v1/note';
let testId;

describe('SERVER MODULE', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());

  describe('VALID REQUESTS', () => {

    describe('POST', () => {
      it('Should respond with a status of 200 upon success', () => {
        return superagent.post(path)
        .send({title: 'test title', content: 'test content'})
        .then(res => {
          expect(res.status).toBe(201);
        });
      });
      it('Should post a Note and return it', () => {
        return superagent.post(path)
        .send({title: 'test title', content: 'test content'})
        .then(res => {
          expect(res.body.title).toMatch(/test title/);
        });
      });

    });

    describe('GET', () => {
      it('Should respond with a status 200', () => {
        return superagent.get(path)
        .then(res => {
          expect(res.status).toBe(200);
        });
      });
      it('Should respond with all Notes', () => {
        return superagent.get(path)
        .then(res => {
          expect(JSON.parse(res.text));
        });
      });
      it('Should respond with a single Note', () => {
        // not sure how to test with id
      });
    });

    describe('PUT', () => {
      it('Should respond with a status 200', () => {

      });
      it('Should respond with the updated Note', () => {

      });
    });

    describe('DELETE', () => {
      it('Should respond with a status 200', () => {

      });
      it('Should remove the Note from storage', () => {

      });
    });

  });



  describe('INVALID REQUESTS', () => {
    describe('POST', () => {

      it('Should respond with "Bad Request" if bad data is sent', () => {
        return superagent.post(path)
        .catch(err => {
          expect(err.response.text).toMatch(/Bad Request/);
        });
      });
      it('Should respond with a status 400', () => {
        return superagent.post(path)
        .catch(err => {
          expect(err.response.status).toBe(400);
        });
      });
    });

    describe('GET', () => {
      it('Should respond with "Bad Request" if bad data is sent', () => {
        return superagent.get(path)
        .catch(err => {
          expect(err.response.text).toMatch(/Bad Request/);
        });
      });
      it('Should respond with a status 400', () => {
        return superagent.get(path)
        .catch(err => {
          expect(err.response.status).toBe(400);
        });
      });
    });

    describe('PUT', () => {
      it('Should respond with "Bad Request" if bad data is sent', () => {
        return superagent.put(path)
        .catch(err => {
          expect(err.response.text).toMatch(/Bad Request/);
        });
      });
      it('Should respond with a status 400', () => {
        return superagent.put(path)
        .catch(err => {
          expect(err.response.status).toBe(400);
        });
      });
    });

    describe('DELETE', () => {
      it('Should respond with "Bad Request" if bad data is sent', () => {
        return superagent.delete(path)
        .catch(err => {
          expect(err.response.text).toMatch(/Bad Request/);
        });
      });
      it('Should respond with a status 400', () => {
        return superagent.delete(path)
        .catch(err => {
          expect(err.response.status).toBe(400);
        });
      });
    });
  });
});
