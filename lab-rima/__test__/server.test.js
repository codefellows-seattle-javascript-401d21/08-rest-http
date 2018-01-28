'use strict';

const server = require('../lib/server');
const superagent = require('superagent');


describe('Server Integration Testing', () => {

  beforeAll(() => server.start(8888, () => {console.log('Listening on 8888');}));
  afterAll(() => server.stop());

  describe('Valid requests', () => {

    describe('POST /api/v1/note', () => {
      let resPost;

      // create a new note to use it in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'Test', content: 'Testing'})
          .then(res => { resPost = res; });
      });

      test(
        'should create a new note',
        () => {
          expect(resPost.body.title).toEqual('Test');
          expect(resPost.body.content).toEqual('Testing');
        });

      test(
        'should respond with http res status 201',
        () => {
          expect(resPost.status).toBe(201);
        });

      test(
        'should have an _id property on the response object',
        () => {
          expect(resPost.body).toHaveProperty('_id');
        });
    });

    // get one record
    describe('GET /api/v1/note?_id=', () => {
      let postOne, getOne;

      // create a note to use it in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'Test', content: 'Testing'})
          .then(res => {
            postOne = res;

            /*return superagent.post(':8888/api/v1/note')
              .send({title: 'test', content: 'testing'})
              .then(res => {postTwo = res;});*/
          });
      });
      // get all records
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note?_id='+postOne.body._id)
          .then(res => {getOne = res;});
      });
      /*      let getOne;
      const testTitle = 'Test';
      const testContent = 'Testing';

      // create new note to use it in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({title: testTitle, content: testContent})
          .then(res => {
            return superagent.get(`:8888/api/v1/note?_id=${res.body._id}`)
            .then(res => {getOne = res;});
          });
      });
*/
      test(
        'should contain id',
        () => {
          expect(getOne.body._id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        });

      test(
        'should return http status 200',
        () => {
          expect(getOne.status).toBe(200);
        });

      test(
        'should contain title and content that has been created in test',
        () => {
          expect(getOne.body.title).toContain(postOne.body.title/*testTitle*/);
          expect(getOne.body.content).toContain(postOne.body.content/*testContent*/);
        });
    });

    // getAll
    describe('GET /api/v1/note', () => {
      let postOne, postTwo, getAll;

      // create new notes to use them in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'Test', content: 'Testing'})
          .then(res => {
            postOne = res;

            return superagent.post(':8888/api/v1/note')
              .send({title: 'test', content: 'testing'})
              .then(res => {postTwo = res;});
          });
      });
      // get all records
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note')
          .then(res => {getAll = res;});
      });

      test(
        'should return an array of ids',
        () => {
          getAll.body.map(_id => {
            expect(_id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
          });
        });

      test(
        'should return http status 200',
        () => {
          expect(getAll.status).toBe(200);
        });

      test(
        'should contain two ids that have been created in test',
        () => {
          expect(getAll.body).toContain(postOne.body._id);
          expect(getAll.body).toContain(postTwo.body._id);
        });

    });

    describe('PUT /', () => {
      let postOne, postTwo, putOne, putTwo, getOne, getTwo;

      // First new note
      // post an existing note to use it in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({ title: 'Test', content: 'Testing' })
          .then(res => { postOne = res; });
      });

      // update an existing note to use it in test
      beforeAll(() => {
        return superagent.put(':8888/api/v1/note?_id=' + postOne.body._id)
          .send({ title: 'Update', content: 'Updating' })
          .catch(err => console.log(err.message))
          .then(res => { putOne = res; });
      });

      // get an existing note to use it in test
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note?_id=' + postOne.body._id)
          .then(res => { getOne = res; });
      });

      // Second new note
      // post an existing note to use it in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({ title: 'Test2', content: 'Testing2' })
          .then(res => { postTwo = res; });
      });

      // update an existing note to use it in test
      beforeAll(() => {
        return superagent.put(':8888/api/v1/note?_id=' + postTwo.body._id)
          .send({ title: 'Update2' })
          .catch(err => console.log(err.message))
          .then(res => { putTwo = res; });
      });

      // get an existing note to use it in test
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note?_id=' + postTwo.body._id)
          .then(res => { getTwo = res; });
      });

      test(
        'should update title and content when put request is sent with both new data',
        () => {
          expect(getOne.body.title).toEqual('Update');
          expect(getOne.body.content).toEqual('Updating');
        }
      );

      test(
        'should respond with http res status 204',
        () => {
          expect(putOne.status).toBe(204);
        }
      );

      test(
        'should update title only  when put request is sent with new data for title only',
        () => {
          expect(getTwo.body.title).toEqual('Update2');
        }
      );

      test(
        'should respond with http res status 204',
        () => {
          expect(putTwo.status).toBe(204);
        }
      );
    });

    describe('DELETE /', () => {

    });
  });
});
