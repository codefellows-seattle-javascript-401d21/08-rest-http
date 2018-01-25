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
          .send({title: 'hello', content: 'watman'})
          .then(res => {
            resPost = res;
          });
      }); 

      it('should post and create a new record', function(done) {
        expect(resPost.body.title).toEqual('hello');
        expect(resPost.body.content).toEqual('watman');
        done();
      });

      it('should respond with a status code 201', function(done) {
        expect(resPost.status).toBe(201);
        done();
      });

      it('should have an _id property on the response object', function(done) {
        expect(resPost.body).toHaveProperty('_id'); //property is taken as string argument
        done();
      });
    });


    describe('GET to /api/v1/note', function() {
      let postOne, postTwo, getOne;

      beforeAll(() => {
        return superagent.post(':3339/api/v1/note')
          .send({ title: 'hello', content: 'watman' })
          .then(res => {
            postOne = res;

            return superagent.post(':3339/api/v1/note')
              .send({ title: 'bye', content: 'watwoman' })
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

      it('should return an array of ids', function (done) {
        getOne.body.map(id => {
          expect(id).toContain(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/); //regex to match both the pattern and contents of the UUID, the {4} represent the number of characters in eaach - separated section
        });
        //copy paste one of the generated UUIDS
        done();
      });

      it('should return a status code of 200', function (done) {
        expect(getOne.status).toBe(200);
        done();
      });

      it('should contain the two ids of records posted', function (done) {
        expect(getOne.body).toContain(postOne.body._id);
        expect(getOne.body).toContain(postTwo.body._id);
        done();
      });
    });


    describe('GET to /api/v1/note?_id=<record id>', function() {

    });
  });


  describe('invalid requests', function() {
    describe('POST /api/v1/note', function() {

      it('should return a 404 give an incorrect path', function(done) {
        // IF USING LEXICAL ARROW INSTEAD OF THE ABOVE function(done) HAVE TO RETURN SUPERAGENT THING
        superagent.post(':3339/api/v1/doesnotexist')
          .send({title: '', content: ''}) //sending at least something back with valid route
          .catch(err => {
            expect(err.status).toBe(404); //try 400 if this test is failing/passing to test valid test
          });
        done();
      });

      it('should return a 400 given no body of data on the request', function(done) {
        superagent.post(':3339/api/v1/note')
          .send() //not sending anything back with valid route
          .catch(err => {
            expect(err.status).toBe(400); //try 404 if this test is failing/passing to test valid test
          });
        done();
      });
    });
  });


  describe('invalid requests', function() {

  });
});