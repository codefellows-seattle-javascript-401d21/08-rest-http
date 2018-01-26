'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');
require('jest');

describe('Server Integration Testing', function() {
  beforeAll(() => server.start(4000, () => console.log(`Listening on 4000`)));
  afterAll(() => server.stop());

  describe('Valid requests', () => {
    describe('POST /api/v1/note', () => {
      let resPost;

      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'hello', content: 'yo'})
          .then(res => {
            resPost = res;
          });
      });
      it('should post and create a new record', () => {
        expect(resPost.body.title).toEqual('hello');
        expect(resPost.body.content).toEqual('yo');
      });
      it('should respond with a satus code 201', () => {
        expect(resPost.status).toBe(201);
      });
      it('should have an _id property on the response object', () => {
        expect(resPost.body).toHaveProperty('_id');
      });
    });


    describe('GET /api/v1/note', () => {
      let resOne, resTwo, getOne;

      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'hello', content: 'yo'})
          .then(res => {
            resOne = res;
            return superagent.post(':4000/api/v1/note')
              .send({title: 'bye', content: 'yup'})
              .then(res => {
                resTwo = res;
              });
          });
      });
      beforeAll(() => {
        return superagent.get(':4000/api/v1/note')
          .then(res => getOne = res);
      });

      it('should return an array of ids', () => {
        getOne.body.map(id => {
          expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        });
      });
      it('should return a status code 200', () => {
        expect(getOne.status).toBe(200);
      });
      it('should contain the two ids of records posted', () => {
        expect(getOne.body).toContain(resOne.body._id);
        expect(getOne.body).toContain(resTwo.body._id);
      });
    });
    describe('PUT /api/v1/note', () => {
      let resOne, putOne;

      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'hello', content: 'yo'})
          .then(res => {
            resOne = res;
          });
      });
      beforeAll(() => {
        return superagent.put(`:4000/api/v1/note?_id=${resOne._id}`)
          .send({title: 'hi', content: 'wassup'})
          .then(res => putOne = res);
      });
      it('should return a status code 204 when complete', () => {
        expect(putOne.status).toBe(204);
      });
      it('should have a new title', () => {
        expect(putOne.title).not.toBe('hello');
      });
      it('should have the same id', () => {
        expect(resOne._id).toBe(putOne._id);
      });
    });

    describe('DELETE /api/v1/note', () => {
      let resPost, delStat;
    
      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'hello', content: 'yo'})
          .then(res => {
            resPost = res;
          });
      });
      beforeAll(() => {
        return superagent.delete(`:4000/api/v1/note?id=${resPost._id}`)
          .then(res => {
            delStat = res.status;
          });
      });
      
      it('should return a status code 204', () => {
        expect(delStat).toBe(204);
      });
      it('should no longer have a title', () => {
        expect(resPost.title).toBe(undefined);
      });
      it('should no longer have an id', () => {
        expect(resPost._id).toBe(undefined);
      });
    });
  });

  describe('Invalid requests', () => {
    describe('POST /api/v1/note', () => {
      it('should return a 404 given an incorrect path', () => {
        return superagent.post(':4000/api/v1/doesnotexist')
          .send({title: '', content: ''})
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });

      it('should return a 400 given no body of data on the request', () => {
        return superagent.post(':4000/api/v1/note')
          .send()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
    describe('GET /api/v1/note', () => {
      it('should return a status code 400 without schema', () => {
        return superagent.get(':4000/api/v1/note')
          .send()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('should return a 404 given an incorrect path', () => {
        return superagent.get(':4000/api/v1/doesnotexist')
          .send({title: '', content: ''})
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
    describe('PUT /api/v1/note', () => {
      it('should return a status code 400 without an item', () => {
        return superagent.put(':4000/api/v1/note')
          .send()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('should return a 404 given an incorrect path', () => {
        return superagent.get(':4000/api/v1/note')
          .send({title: '', content: ''})
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
    describe('DELETE /api/v1/note', () => {
      it('should return a status code 404 with a bad schema', () => {
        return superagent.delete(':4000/api/v1/doesnotexist')
          .send()
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('should return a status code 400 with a bad request', () => {
        return superagent.delete(':4000/api/v1/note')
          .send({title: '', content: ''})
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
  });
});