'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
require ('jest');


describe('Server Integration testing', function() {
  beforeAll(() => server.start(4000, () => console.log(`Listening on 4000`)));
  afterAll(() => server.stop());

  describe('Valid Tests', function() {

    // start of Post route
    describe('Post Route', function() {
      let resPost;
      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'Roger', content: 'coder'})
          .then(res => {
            resPost = res;
          });

      });
      it('should post and create a new record', () => {
        expect(resPost.body.title).toEqual('Roger');
        expect(resPost.body.content).toEqual('coder');
      });
      it('should respond with a status code 201', () => {
        expect(resPost.status).toBe(201);
      });
      it('should have an _id property on the response object', () => {
        expect(resPost.body).toHaveProperty('_id');
      });
    });
    //end of post router
    //start of get route
    describe('Get Route', function() {
      let postOne, postTwo, getOne;
      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'Roger', content: 'coder'})
          .then(res => {
            postOne = res;
            return superagent.post(':4000/api/v1/note')
              .send({title: 'Heath', content: 'wanna be coder'})
              .then(res => {
                postTwo = res;
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
      it('should return a status code of 201', () => {
        expect(getOne.status).toBe(200);
      });
      it('should contain the two ids of records posted', () => {
        expect(getOne.body).toContain(postOne.body._id);
        expect(getOne.body).toContain(postTwo.body._id);
      });


    });
    //end of get Route
    //start of delete route
    describe('Delete Route', function() {
      let postOne, postTwo;

      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({title: 'Roger', content: 'coder'})
          .then(res => {
            postOne = res;
            return superagent.post(':4000/api/v1/note')
              .send({title: 'Heath', content: 'wanna be coder'})
              .then(res => {
                postTwo = res;
              });
          });
      });

      it('should return a status of 201', () => {
        return superagent.delete(`:4000/api/v1/note?_id=${postOne.body._id}`)
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('should return a deleted note response', () => {
        return superagent.delete(`:4000/api/v1/note?_id=${postTwo.body._id}`)
          .then(res => {
            expect(res.text).toContain('Deleted');
            expect(res.text).toContain('Deleted');
          });
      });
      it('should check that the record has been deleted', () =>{
        return superagent.get(`:4000/api/v1/note?_id=${postTwo.body._id}`)
          .catch(res => {
            expect(res.status).toBe(400);
          });
      });

    });
    //end of delete route
    //start of put route
    describe('Put Route', function() {
      let resPost, putOne;
      beforeAll(() => {
        return superagent.post(`:4000/api/v1/note`)
          .send({title: 'Roger', content: 'coder'})
          .then(res => {
            resPost = res;
            return superagent.put(`:4000/api/v1/note?_id=${resPost.body._id}`)
              .send({title: 'Roger D', content: 'coder wannabe'})
              .then(res => {
                putOne = res;
              });
          });
      });

      it('should amend an existing record', () => {
        return superagent.get(`:4000/api/v1/note?_id=${resPost.body._id}`)
          .then(res =>{
            expect(res.body.title).toEqual('Roger D');
            expect(res.body.content).toEqual('coder wannabe');
          });

      });
      it('should respond with a status code 200', () => {
        expect(putOne.status).toBe(200);
      });
      it('should have an _id property on the response object', () => {
        expect(putOne.text).toBe('Note Ammended');
      });
    });

  });

  //start of invalid Tests
  describe('Invalid Test', function() {

    describe('Post Route', () =>{
      it('Should get a 400 status code when all data not sent', () =>{
        return superagent.post(':4000/api/v1/note')
          .send({content: 'coder wannabe'})
          .catch(err =>{
            expect(err.status).toBe(400);
          });

      });

    });
    describe('Put Route', () =>{
      it('Should get a 400 status code when an id is not sent with request', () =>{
        return superagent.put(':4000/api/v1/note')
          .send({title: 'Roger D', content: 'coder wannabe'})
          .catch(err =>{
            expect(err.status).toBe(400);
          });

      });

    });
    describe('Delete Route', () =>{
      it('Should get a 400 status code when an id is not sent with request', () =>{
        return superagent.delete(':4000/api/v1/note')
          .catch(err =>{
            expect(err.status).toBe(400);
          });

      });

    });

  });

});
