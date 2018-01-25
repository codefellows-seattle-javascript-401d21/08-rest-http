'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');



describe('SERVER MODULE', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());

  describe('VALID REQUESTS', () => {

    describe('POST', () => {
      it('Should respond with a status of 200 upon success', () => {

      });
      it('Should post a Note and return it', () => {

      });

    });

    describe('GET', () => {
      it('Should respond with a status 200', () => {

      });
      it('Should respond with all Notes', () => {

      });
      it('Should respond with a single Note', () => {

      });
    });

    describe('PUT', () => {
      it('Should respond with a status 200', () => {

      });
      it('Should respond with the updated Note', () => {

      });
    });

    describe('DELETE', () => {
      it('Should respond with a status 200', () => {

      });
      it('Should remove the Note from storage', () => {

      });
    });

  });

  describe('INVALID REQUESTS', () => {
    describe('POST', () => {

      it('Should respond with "Bad Request" if bad data is sent', () => {

      });
      it('Should respond with a status 200', () => {

      });
    });

    describe('GET', () => {
      it('Should respond with "Bad Request" if bad data is sent', () => {

      });
      it('Should respond with a status 200', () => {

      });
    });

    describe('PUT', () => {
      it('Should respond with "Bad Request" if bad data is sent', () => {

      });
      it('Should respond with a status 200', () => {

      });
    });

    describe('DELETE', () => {
      it('Should respond with "Bad Request" if bad data is sent', () => {

      });
      it('Should respond with a status 200', () => {

      });
    });

    describe('404', () => {
      it('Should give a 404 status upon an invalid path', () => {

      });
    });
  });
});
