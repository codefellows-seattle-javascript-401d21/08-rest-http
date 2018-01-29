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
      let postOne, postTwo, getOne;

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
      let resPost, resPut;
      beforeAll(() => {
        return superagent.post(':3339/api/v1/note')
          .send({title: 'hello', content: 'everybody'})
          .then(res => {
            resPost = res;
          });
      });

      beforeAll(() => {
        return superagent.put(':3339/api/v1/note')
          .send({title: 'gday', content: 'mate'})
          .then(res => {
            resPut = res;
          });
      });

      it('should update existing record', () => {
        expect(res.body.title).toEqual('gday');
        expect(res.body.content).toEqual('mate');
      });

      it('should return a status code of 204', () => {
        expect(res.status).toBe(204);
      });
    });

    describe('DELETE /api/v1/note', function() {
      let resPost, resDelete, id;
      beforeAll(() => {
        return superagent.post(':3339/api/v1/note')
          .send({title: 'hello', content: 'everybody'})
          .then(res => {
            id = res.body._id;
            resPost = res;
          });
      });
      
      beforeAll(() => {
        return superagent.delete(`:3339/api/v1/note?id=${id}`)
          .then(res => {
            resDelete = res;
          })
          .catch(err => {
          });
      });

      it('should return a status code of 204 on deletion', () => {
        expect(resDelete.status).toBe(204);
      });

    });
  });


  describe('invalid requests', function() {
    describe('POST /api/v1/note', function() {

      it('should return a 404 given an incorrect path', () => {
        // IF USING LEXICAL ARROW INSTEAD OF THE ABOVE function(done) HAVE TO RETURN SUPERAGENT THING
        return superagent.post(':3339/api/v1/doesnotexist')
          .send({title: '', content: ''}) //sending at least something back with valid route
          .catch(err => {
            expect(err.status).toBe(404); //try 400 if this test is failing/passing to test valid test
          });
      });

      it('should return a 400 given no body of data on the request', () => {
        return superagent.post(':3339/api/v1/note')
          .send() //not sending anything back with valid route
          .catch(err => {
            expect(err.status).toBe(400); //try 404 if this test is failing/passing to test valid test
          });
        
      });
    });
  });
});