'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server Integration', function() {
  beforeAll(() => server.start(400));
  afterAll(() => server.stop());
  

  describe('Valid requests', () => {
    describe('POST /api/v1/note', () => {
      let resPost;
      beforeAll(()=> {
        return  superagent.post(':4000/api/v1/note')
          .send({title: 'hello', content: 'Funkn-A'})
          .then( res => {
            resPost = res;
          });
      });
      it('should post and create a new record', () => {
        expect(resPost.body.title).toEqual('hello');
        expect(resPost.body.content).toEqual('Funkn-A');
      });
      it('should post with 201', () => {
        expect(resPost.status).toEqual(201);
      });
      it('should should have id', () => {
        //expect(resPost.status).toEqual(200);
      });
    });

    describe('GET /api/v1/note', () => {
      let postOne, postTwo, getOne;
      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'hello', content: 'Funkn-A'})
          .then( res => {
            postOne = res;
          })
          .then( () => {
            superagent.post(':4000/api/v1/note')
              .send({title: 'GoodBye', content: 'Funkn-B'})
              .then( res => {
                postTwo = res;
              });
          });
      });
    

      beforeAll( () => {
        return superagent.get(':4000/api/v1/note')
          .then( res => getOne = res);
      });

      it('should return an array of ids', () => {

      });

      it('should return status 200', () => {

      });
      
      it('should contain the two ides from the post' , () => {

      });
      
    });

    describe('GET /api/v1/note?id', () => {

    });
  });

  describe('Invalid requests', () => {

  });

});