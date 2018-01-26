'use strict';


const superagent = require('superagent');
const server = require('../lib/server');

describe('MY APPLICATION ', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());
  describe('VALID', () => {
    describe('/POST', () => {
      let resPost;

      beforeAll(() => {
        return superagent.post(':3000/api/v1/note')
          .send({title: 'hello', content: 'watman'})
          .then(res => {
            resPost = res;
          });
      });

      it('should post and create a new record', () => {
        expect(resPost.body.title).toEqual('hello');
        expect(resPost.body.content).toEqual('watman');
      });
      it('should respond with a status code 201', () => {
        expect(resPost.status).toBe(201);
      });
      it('should have an _id property on the response object', () => {
        expect(resPost.body).toHaveProperty('_id');
      });
    });
    describe('GET /api/v1/note', () => {
      let postOne, postTwo, getOne;

      beforeAll(() => {
        return superagent.post(':3000/api/v1/note') 
          .send({ title: 'hello', content: 'watman'})
          .then(res => {
            postOne = res;

            return superagent.post(':3000/api/v1/note')
              .send({ title: 'bye', content: 'watwoman'})
              .then(res => {
                postTwo = res;
              });
          });
      });

      beforeAll(() => {
        return superagent.get(':3000/api/v1/note')
          .then(res => getOne = res);
      });

      it('should return an array of ids', () => {
        getOne.body.map(id => {
          expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        });
      });
      it('should return a status code of 200', () => {
        expect(getOne.status).toBe(200);
      });
      it('should contain the two ids of records posted', () => {
        expect(getOne.body).toContain(postOne.body._id);
        expect(getOne.body).toContain(postTwo.body._id);
      });
    });
    describe('PUT /api/v1/note', () => {
      let resPost, resPut;
      beforeAll(() => {
        return superagent.post(':3000/api/v1/note')
          .send({title: 'hello', content: 'watman'})
          .then(res => {
            resPost = res;
          });
      });
      beforeAll(() => {
        return superagent.put(':3000/api/v1/note')
          .send({title: 'bulldog', content: 'kappa'})
          .then(res => {
            resPut = res;
          });
      });
      it('should update an existing record', () => {
        expect(resPut.body.title).toEqual('bulldog');
        expect(resPut.body.content).toEqual('kappa');
      });
      it('should return 202 status code', () => {
        expect(resPut.status).toBe(202);
      });
    });
    describe('DELETE /api/v1/note', () => {
      let resPost, id, resDelete;
      beforeAll(() => {
        return superagent.post(':3000/api/v1/note')
          .send({title: 'hello', content: 'watman'})
          .then(res => {
            id = res.body._id; 
            resPost = res;
          });
      });
      beforeAll(() => {
        return superagent.delete(`:3000/api/v1/note?id=${id}`)
          .then(res => {
            resDelete = res;
          }).catch(err => {
          });
      });
      it('should return 204 status code', () => {
        expect(resDelete.status).toBe(204);
      });
      it('should return ', () => {
        return superagent.get(':3000/api/v1/note')
          .then(res => {
            expect(res.body.length).toBe(5);
          });
      });
    });
  });
  describe('INVALID', () => {
    describe('POST /api/v1/note', () => {
      it('should return a 404 given an incorrect path', () => {
        return superagent.post(':3000/api/v1/doesnotexist')
          .send({title: '', content:''})
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('should return a 400 given no body of data on the request', () => {
        return superagent.post(':3000/api/v1/note')
          .send()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
    describe('GET /api/v1/note', () => {
      it('should return a 404 given an incorrect path', () => {
        return superagent.get(':3000/api/v1/doesnotexist')
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
    describe('PUT /api/v1/note', () => {
      it('should return a 404 given an incorrect path', () => {
        return superagent.put(':3000/api/v1/doesnotexist')
          .send({title: '', content:''})
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('should return a 400 given no body', () => {
        return superagent.put(':3000/api/v1/doesnotexist')
          .send()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
    describe('DELETE /api/v1/note', () => {
      it('should return a 400 if the path doesnt exist', () => {
        return superagent.delete(':3000/api/v1/note?id=blblblb')
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('should return a 404 if the path is invalid', () => {
        return superagent.delete(':3000/api/v1/doesnotexist')
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});
