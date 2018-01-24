'use strict';

const server = require('../lib/server');
const superagent = require('superagent');


describe('Server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/time')
          .then(res => {
            expect(res.status).toBe(200);
          });
        //.catch() // usually not needed in a case of successful request
      });
      it('should return a date/time object', () => {
        return superagent.get(':4444/time')
          .then(res => {
            expect(res.body).toHaveProperty('now');
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });

  // describe('Invalid Request to the API', () => {

  // })
});