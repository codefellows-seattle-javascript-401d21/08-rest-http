'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');
 
describe('#server.js testing', function() {
  beforeAll(() => server.start(3339)); //starts the server on the specified port for testing purposes
  afterAll(() => server.stop()); //stops the server after all tests have completed

  describe('valid requests', function() {
    describe('POST to /api/v1/note', function() {
      let resPost;

      beforeAll(() => { //before all 3 it blocks, superagent request and cache response so we can assert response is valid
        return superagent.post(':3339/api/v1/note')
          .send({title: 'hello', content: 'everybody'})
          .then(res => {
            resPost = res;
          });
      }); 

      it('should post and create a new record', () => {
        expect(resPost.body.title).toEqual('hello');
        expect(resPost.body.content).toEqual('everybody');
      });

      it('should respond with a status code 201', () => {
        expect(resPost.status).toBe(201);
      });

      it('should have an _id property on the response object', () => {
        expect(resPost.body).toHaveProperty('_id'); //property is taken as string argument
      });
    });


    describe('GET to /api/v1/note', function() {
      let postOne, postTwo, getOne, getSingle;

      beforeAll(() => {
        return superagent.post(':3339/api/v1/note')
          .send({title: 'hello', content: 'everybody'})
          .then(res => {
            postOne = res;

            return superagent.post(':3339/api/v1/note')
              .send({title: 'bye', content: 'yall'})
              .then(res => {
                postTwo = res;
              });
          });
      });

      beforeAll(() => {
        return superagent.get(':3339/api/v1/note')
          .then(res => {
            getOne = res;
          });
      });

      it('should return a single ID', () => {
        return superagent.get(`:3339/api/v1/note?_id=${postOne.body._id}`)
          .then(res => {
            return getSingle = res;
          })
          .then(() => {
            expect(getSingle.body.title).toEqual('hello');
            expect(getSingle.body.content).toEqual('everybody');
          });
      });

      it('should return an array of ids', () => {
        getOne.body.map(id => {
          expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/); //regex to match both the pattern and contents of the UUID, the {4} represent the number of characters in eaach - separated section
        });
        //copy paste one of the generated UUIDS
      });

      it('should return a status code of 200', () => {
        expect(getOne.status).toBe(200);
      });

      it('should contain the two ids of records posted', () => {
        expect(getOne.body).toContain(postOne.body._id);
        expect(getOne.body).toContain(postTwo.body._id);
      });
    });


    describe('PUT /api/v1/note', function() {
      let resPost, resPut, getOne;
      beforeAll(() => {
        return superagent.post(':3339/api/v1/note')
          .send({title: 'hello', content: 'everybody'})
          .then(res => {
            resPost = res;
          });
      });

      beforeAll(() => {
        return superagent.put(':3339/api/v1/note')
          .send({title: 'gday', content: 'mate', _id: resPost.body._id})
          .then(res => {
            resPut = res;
          });
      });

      it('should update existing record', () => {
        return superagent.get(`:3339/api/v1/note?_id=${resPost.body._id}`)
          .then(res => {
            return getOne = res;
          })
          .then(() => {
            expect(getOne.body.title).toEqual('gday');
            expect(getOne.body.content).toEqual('mate');
          });
      });

      it('should return a status code of 204', () => {
        expect(resPut.status).toBe(204);
      });
    });

    describe('DELETE /api/v1/note', function() {
      let resDelete, id;
      beforeAll(() => {
        return superagent.post(':3339/api/v1/note')
          .send({title: 'hello', content: 'everybody'})
          .then(res => {
            id = res.body._id;
          });
      });
      
      beforeAll(() => {
        return superagent.delete(`:3339/api/v1/note?_id=${id}`)
          .then(res => {
            resDelete = res;
          });
      });

      it('should return a status code of 204 on deletion', () => {
        expect(resDelete.status).toBe(204);
      });

      it('should update existing record', () => {
        return superagent.get(`:3339/api/v1/note?_id=${id}`)
          .catch(err => {
            expect(err.status).toBe(404);
            expect(err.message).toContain('Not Found');
          });
      });
    });
  });

  describe('invalid requests', function() {
    describe('POST to /api/v1/note', function() {
      it('should respond with a status code 400', () => {
        return superagent.post(':3339/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });

      it('should respond with a status code 404 with bad route path', () => {
        return superagent.post(':3339/api/v1/notee')
          .send({})
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });


    describe('GET to /api/v1/note', function() {
      it('should respond with status code 404 with bad path', () => {
        return superagent.get(':3339/api/v1/not')
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });

      it('should respond with status code 404 with bad ID', () => {
        return superagent.get(':3339/api/v1/note?_id=badID')
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });


    describe('PUT /api/v1/note', function() {
      let resPost;
      beforeAll(() => {
        return superagent.post(':3339/api/v1/note')
          .send({title: 'hello', content: 'everybody'})
          .then(res => {
            resPost = res;
          });
      });

      it('should fail to update with malformed querystring', () => {
        return superagent.put(`:3339/api/v1/note?_id=${resPost.body._id}`)
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });

    describe('DELETE /api/v1/note', function () {
      it('should return a status code of 404 with bad route', () => {
        return superagent.delete(`:3339/api/v1/not`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});