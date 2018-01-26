'use strict';

const server = require('../lib/server');
const superagent = require('superagent');


describe('Server module', () => {
  beforeAll(() => server.start(8888));
  afterAll(() => server.stop());

  describe('POST /', () => {

    let id;
    test(
      'valid: should respond with a status 201',
      () => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'post test 1', content: 'Post test 1 content'})
          .then(res => {
            expect(res.status).toBe(201);
            expect(res.body.title).toEqual('post test 1');
            expect(res.body.content).toEqual('Post test 1 content');
            id = res.body._id;
          });
    });

    test(
      'invalid: should respond with a status 400 with no title',
      () => {
        return superagent.post(':8888/api/v1/note')
          .send({content: 'Post test 1 content'})
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toEqual('Cannot post: Title and content required.');
          });
    });

    test(
      'invalid: should respond with a status 400 with no content',
      () => {
        return superagent.post(':8888/api/v1/note')
          .send({title: 'Post test 1 content'})
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toEqual('Cannot post: Title and content required.');
          });
    });

    test(
      'invalid: should respond with a status 400 with no title, no content',
      () => {
        return superagent.post(':8888/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toEqual('Bad Request');
          });
    });
  });

  describe('GET /', () => {

    var resPost1, resPost2;

    test(
      'valid: should respond with a status 200 (fetch all)',
      () => {
        superagent.post(':8888/api/v1/note').send({title: 'post 2', content: 'post 2 content'}).then(res => {resPost1 = res});
        superagent.post(':8888/api/v1/note').send({title: 'post 3', content: 'post 3 content'}).then(res => {resPost2 = res});
        return superagent.get(':8888/api/v1/note')
          .then(res => {
            expect(res.status).toBe(200);
            let notes = Object.values(res.body);
            expect(notes[0].title).toEqual('post 2');
            expect(notes[0].content).toEqual('post 2 content');
            expect(notes[1].title).toEqual('post 3');
            expect(notes[1].content).toEqual('post 3 content');
        });
    });


    test(
      'valid: should respond with a status 200 (fetch one)',
      () => {
        return superagent.get(`:8888/api/v1/note?_id=${resPost1.body._id}`)
          .then(res => {
            expect(res.status).toBe(200);
            let notes = Object.values(res.body);
            expect(notes[0]).toEqual('post 2');
            expect(notes[1]).toEqual('post 2 content');
        });
     });

    test(
      'invalid: should respond with a status 400 (fetch all)',
      () => {
        return superagent.get(':8888/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toEqual('Bad Request');
        });
    });
 
    test(
      'invalid: should respond with a status 400 (fetch one)',
      () => {
        return superagent.get(':8888/api/v1/note?_id=9')
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toEqual('Bad Request');
        });
     });
  });

  describe('PUT /', () => {

    test(
      'valid: should respond with a status 204',
      () => {
        var testID;
        return superagent.post(':8888/api/v1/note')
        .send({title: 'post 4', content: 'post 4 content'})
        .then(res => {
          testID = res._id;
          superagent.put(':8888/api/v1/note')
          .send({_id: res.body._id, title: 'post 4'})
          .then(res => {
            expect(res.status).toBe(204);
            superagent.get(`:8888/api/v1/note?_id=${testID}`)
            .then(res => {
              expect(res.body.title).toEqual('post 4');
              expect(res.body.content).toEqual('post 4 content');
            });
        });
      });
    });


    test(
      'invalid: should respond with a status 400 with bad object',
      () => {
        return superagent.put(':8888/api/v1/note')
          .send({_id: 9})
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toEqual('Bad Request');
        });
     });

  });

  describe('DELETE /', () => {

    test(
      'valid: should respond with a status 200 (delete one note)',
      () => {
        var testID2;
        return superagent.post(':8888/api/v1/note')
        .send({title: 'post 5', content: 'post 5 content'})
        .then(res => {
          testID2 = res._id;
          superagent.delete(':8888/api/v1/note')
          .send({_id: res._id})
          .then(res => {
            expect(res.status).toBe(204);
            superagent.get(`:8888/api/v1/note?_id=${testID2}`)
            .catch(err => {
              expect(err.status).toEqual(400);
              expect(err.response.text).toEqual('Bad Request');
            });
          });
        });
    });


    test(
      'valid: should respond with a status 200 (delete all notes)',
      () => {
        return superagent.delete(':8888/api/v1/note')
        .then(res => {
          expect(res.status).toBe(204);
          superagent.get(':8888/api/v1/note')
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({});
          });
       });
    });

    test(
      'invalid: should respond with a status 400',
      () => {
        return superagent.delete(':8888/api/v1/note?_id=10')
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toEqual('Bad Request');
          });
      });
    });
});
