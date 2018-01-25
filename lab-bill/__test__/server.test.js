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
        expect(getTwo.body).toContain(postTwo.body._id);
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
  });
});










//   describe('Valid', () => {
//     describe('/POST', ())
//     it('should respond with a status 201', () => {
//       return superagent.post(`:3000/api/v1/note`)
//         .send({title: 'Dune', content: 'this is the content'})
//         .then(res => {
//           expect(res.status).toBe(201);
//         });
//     });
//     it('should respond with the body we sent', () => {
//       return superagent.post(`:3000/api/v1/note`)
//         .send({title: 'Dune', content: 'this is the content'})
//         .then(res => {
//           expect(res.body.title).toBe('Dune');
//         });
//     });
//   });
//   describe('Invalid', () => {
//     it('should respond with a status 400 if no body is given', () => {
//       return superagent.post(`:3000/api/v1/note`)
//         .catch(err => {
//           expect(err.status).toBe(400);
//         });
//     });
//   });
// });
// describe('GET', () => {
//   beforeAll(() => server.start(3000));
//   afterAll(() => server.stop());
//   describe('Valid', () => {
//     it('should respond with a status 200', () => {
//       return superagent.get(`:3000/api/v1/note`)
//         .then(res => {
//           expect(res.status).toBe(200);
//         });
//     });
//     it('should respond with the body we sent', () => {
//       return superagent.get(`:3000/api/v1/note`)
//         .then(res => {
//           expect(res.text.includes('Dune')).toBe(true);
//         });
//     });
//   });
//   describe('Invalid', () => {
//     it('should respond with a status 404 if invalid get path', () => {
//       return superagent.get(`:3000/ai/v1/note`)
//         .catch(err => {
//           expect(err.status).toBe(404);
//         });
//     });
//   });
// });
// describe('PUT', () => {
//   beforeAll(() => server.start(3000));
//   afterAll(() => server.stop());
//   describe('Valid', () => {
//     it('should respond with a status 202', () => {
//       return superagent.put(`:3000/api/v1/note`)
//         .send({title: 'Hello', content: 'put request'})
//         .then(res => {
//           expect(res.status).toBe(202);
//         });
//     });
//     it('should respond with the body we sent', () => {
//       return superagent.put(`:3000/api/v1/note`)
//         .send({title: 'Hello', content: 'put request'})
//         .then(res => {
        
//           expect(res.body.title).toBe('Hello');
//         });
//     });
//   });
//   describe('Invalid', () => {
//     it('should respond with a status 400 if no body is given', () => {
//       return superagent.put(`:3000/api/v1/note`)
//         .catch(err => {
//           expect(err.status).toBe(400);
//         });
//     });
//   });
// });
// describe('DELETE', () => {
//   beforeAll(() => server.start(3000));
//   afterAll(() => server.stop());
//   describe('Valid', () => {
//     it('should respond with a status 201', () => {
//       return superagent.delete(`:3000/api/v1/note`)
//         .send({title: 'Dune', content: 'this is the content'})
//         .then(res => {
//           expect(res.status).toBe(201);
//         });
//     });
//     it('should respond with the body we sent', () => {
//       return superagent.delete(`:3000/api/v1/note`)
//         .send({title: 'Dune', content: 'this is the content'})
//         .then(res => {
//           expect(res.text).toBe('delete successful');
//         });
//     });
//   });
//   describe('Invalid', () => {
//     it('should respond with a status 400 if no body is given', () => {
//       return superagent.delete(`:3000/api/v1/note`)
//         .catch(err => {
//           expect(err.status).toBe(400);
//         });
//     });
//   });
// });