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
          });
      });
      // get all records
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note?_id='+postOne.body._id)
          .then(res => {getOne = res;});
      });

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
          expect(getOne.body.title).toContain(postOne.body.title);
          expect(getOne.body.content).toContain(postOne.body.content);
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

    // delete specific one
    describe('DELETE /api/v1/note?_id=', () => {
      let postOne, postTwo, delOne, getOne, getTwo;

      // create two notes to use them in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'Test', content: 'Testing'})
          .then(res => { postOne = res;});
      });

      // create another record
      beforeAll(()  => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'Test2', content: 'Testing2'})
          .then(res => { postTwo = res; });
      });
      // delete a record
      beforeAll(() => {
        return superagent.del(':8888/api/v1/note?_id=' + postOne.body._id)
          .then(res => { delOne = res; });
      });
      // try to get a record that has been deleted
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note?_id=' + postOne.body._id)
          .catch(err => { getOne = err; });
      });
      // try to get a record that should exist
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note?_id=' + postTwo.body._id)
          .then(res => { getTwo = res; });
      });

      test(
        'should delete one record',
        () => {
          expect(getOne.status).toBe(404);
          expect(getOne.response.text).toEqual('404, Record does not exist');
        }
      );

      test(
        'should not delete the other records',
        () => {
          expect(getTwo.status).toBe(200);
          expect(getTwo.body.title).toEqual('Test2');
          expect(getTwo.body.content).toEqual('Testing2');
        }
      );

      test(
        'should return http status 200',
        () => {
          expect(delOne.status).toBe(200);
        }
      );
    });

    // delete all
    describe('DELETE /api/v1/note', () => {
      let delAll, getAll;

      // create new notes to use them in test
      beforeAll(() => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'Test', content: 'Testing'})
          .then(() => {
            return superagent.post(':8888/api/v1/note')
              .send({title: 'test', content: 'testing'});
          });
      });
      // delete all records
      beforeAll(() => {
        return superagent.delete(':8888/api/v1/note')
          .then(res => {delAll = res;});
      });
      // try to get all records
      beforeAll(() => {
        return superagent.get(':8888/api/v1/note')
          .catch(err => {getAll = err;});
      });

      test(
        'should return http status 200',
        () => {
          expect(delAll.status).toBe(200);
        }
      );

      test(
        'should delete all records',
        () => {
          expect(getAll.response.status).toBe(404);
          expect(getAll.response.text).toBe('404, No record in schema');
        }
      );
    });
  });
});
