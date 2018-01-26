'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server Integration', function() {
  beforeAll(() => server.start(4000));
  afterAll(() => server.stop());
  

  describe('Valid requests', () => {
    let postOne, postTwo, getOne;
    describe('POST /api/v1/note => create', () => {
      let resPost;
      beforeAll(()=> {
        return  superagent.post(':4000/api/v1/note')
          .send({subject: 'hello', comment: 'Funkn-A'})
          .then( res => {
            resPost = res;
          });
      });
      it('should post and create a new record', () => {
        expect(resPost.body.subject).toEqual('hello');
        expect(resPost.body.comment).toEqual('Funkn-A');
      });
      it('should post with 201', () => {
        expect(resPost.status).toEqual(201);
      });
      it('should should have id on the response body', () => {
        expect(resPost.body).toHaveProperty('id');
      });
    });

    describe('GET /api/v1/note?id=someid => fetchOne', () => {
      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({subject: 'hello', comment: 'Funkn-A'})
          .then( res => {
            postOne = res;
          })
          .then( () => {
            return superagent.post(':4000/api/v1/note')
              .send({subject: 'GoodBye', comment: 'Funkn-B'})
              .then( res => {
                postTwo = res;
              });
          });
      });

      beforeAll(() => {
        return superagent.get(`:4000/api/v1/note?id=${postTwo.body.id}`)
          .then(res => getOne = res);       
      });

      it('should return a status of 200', () => {
        expect(getOne.status).toEqual(200);
      });

      it('Should return the item with the id that was requested', () => {
        expect(getOne.body.id).toEqual(postTwo.body.id);
        expect(getOne.body.subject).toEqual(postTwo.body.subject);
        expect(getOne.body.comment).toEqual(postTwo.body.comment);
      });

      it('Should return the item with a correctly formed uuid.', () => {
        expect(getOne.body.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      });
    });

    describe('GET /api/v1/note => fetchAll', () => {
      let getTwo, items;

      beforeAll(() => {
        return superagent.get(':4000/api/v1/note')
          .then(res => {
            getTwo = res;
            items = JSON.parse(getTwo.text);
          });       
      });

      it('should return a status of 200', () => {
        expect(getTwo.status).toEqual(200);
      });

      it('Should return an array', () => {
        expect(items).toBeInstanceOf(Array);
      });

      it('Should return an array of all the ids', () => {
        expect(items).toContain(`${postTwo.body.id}`);
        expect(items).toContain(`${postOne.body.id}`);
      });

    });

    describe('PUT /api/v1/note => update', () => {

      let putPost, putOne, putGet;
      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({subject: 'hello', comment: 'Funkn-A'})
          .then( res => {
            putPost = res;
          });
      });

      beforeAll(() => {
        return superagent.put(`:4000/api/v1/note?id=${putPost.body.id}`)
          .send({subject: 'Bonjour', comment: 'Sacre Bleu'})
          .then( res => {
            putOne = res;
          });
      });

      beforeAll(() => {
        return superagent.get(`:4000/api/v1/note?id=${putPost.body.id}`)
          .send({subject: 'Bonjour', comment: 'Sacre Bleu'})
          .then( res => {
            putGet = res;
          })
          .catch(console.err);
      });

      it('should return a status cone of 204', () => {
        expect(putOne.status).toBe(204);
      }); 

      it('should have values from the put data', () => {
        let getBody = JSON.parse(putGet.text);  
        expect(getBody.subject).toEqual(putOne.request._data.subject);
        expect(getBody.comment).toEqual(putOne.request._data.comment);
      }); 

      it('should have different values form the original post data', () => {
        let getBody = JSON.parse(putGet.text);  
        expect(getBody.subject).toEqual(putOne.request._data.subject);
        expect(getBody.comment).toEqual(putOne.request._data.comment);
      }); 
      
      it('should have the same id as the original item created by post', () => {
        let getBody = JSON.parse(putGet.text);
        expect(getBody.id).toEqual(putPost.body.id);
      }); 

    });

    describe('DELETE /api/v1/note => delete', () => {

      let dPost, deleteRes, dGet;
      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({subject: 'hello', comment: 'Funkn-A'})
          .then( res => {
            dPost = res;
          });
      });

      beforeAll(() => {
        return superagent.delete(`:4000/api/v1/note?id=${dPost.body.id}`)
          .then( res => {
            deleteRes = res;
          });
      });

      beforeAll(() => {
        return superagent.get(`:4000/api/v1/note?id=${dPost.body.id}`)
          .catch( res => {
            dGet = res;
          });
      });

      it('should return a 204 status', () => {
        expect(deleteRes.status).toEqual(204);  
      });

      it('should not have data in the body', () => {
        expect(deleteRes.body).toEqual(expect.objectContaining({}));  
      });

      it('should delete an item', () => {
        expect(dGet.status).toEqual(400);  
      });

    });

  });
});
    

