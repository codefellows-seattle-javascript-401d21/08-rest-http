'use strict';

const server = require('../lib/server');
const superagent = require('superagent');


describe('Server module', () => {
  beforeAll(() => server.start(8888));
  afterAll(() => server.stop());

  
  describe('Valid Request to the API', () => {

    describe('GET /', () => {

      test(
        'should respond with a status 200 (fetch all)',
        () => {
          return superagent.get(':8888/api/v1/note')
            .then(res => {
              expect(res.status).toBe(200);
              //expect(res.text).toEqual(expect.stringContaining(''));
            });
        });

      /*      test(
        'should respond with a status 200 and cow says text',
        () => {
          return superagent.get(':8888/cowsay?text=Hello%20I\'m%20Cow!')
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.text).toEqual(expect.stringContaining('Hello I\'m Cow!'));
            });
      });

      test(
        'should respond with a status 400 with /cowsay but no text',
        () => {
          return superagent.get(':8888/cowsay')
            .ok(res => res.status < 500)
            .then(res => {
              expect(res.status).toBe(400);
              expect(res.text).toEqual(expect.stringContaining('bad request'));
            });
      });
    });

    describe('POST /', () => {

      test(
        'should respond with a status 201 with text',
        () => {
          return superagent.post(':8888/cowsay')
            .send({text: 'posting'})
            .then(res => {
              expect(res.status).toBe(201);
              expect(res.text).toEqual(expect.stringContaining('posting'));
            });
      });

      test(
        'should respond with a status 400 with /cowsay but no text',
        () => {
          return superagent.post(':8888/cowsay')
            .ok(res => res.status < 500)
            .send({})
            .then(res => {
              expect(res.status).toBe(400);
              expect(res.text).toEqual(expect.stringContaining('bad request'));
            });
      });

      test(
        'should respond with a status 400 with malformed request',
        () => {
          return superagent.post(':8888/cowsay')
            .ok(res => res.status < 500)
            .send({xxx: 'yyy'})
            .then(res => {
              expect(res.status).toBe(400);
              expect(res.text).toEqual(expect.stringContaining('bad request'));
            });
      });
*/    });
  });
});
