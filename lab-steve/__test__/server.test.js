'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('Server module', () => {
  beforeAll(() => server.start(5555));
  afterAll(() => server.stop());

  describe('Valid request to the API', () => {
    describe('POST /api/v1/note', () => {
      // failure - check the status
      it('should respond with status code 400 and Bad Request when no data provided', () => {
        return superagent.post(':5555/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400);
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });

      // success - check the status
      it('should respond with a status code 201', () => {
        return superagent.post(':5555/api/v1/note')
          .send({title: 'note1', content: 'test note'})
          .then(res => expect(res.status).toBe(201));
      });

      // success - check the note
      it('should respond with the newly created test note', () => {
        return superagent.post(':5555/api/v1/note')
          .send({title: 'note2', content: 'test note 2'})
          .then(res => {
            expect(res.body.title).toBe('note2');
            expect(res.body.content).toBe('test note 2');
          });
      });
    });

    describe('GET /api/v1/note', () => {
      // success - provide status 200
      it('should return status 200 on successful get', () => {
        // this works since the post tests above added some test notes
        return superagent.get(':5555/api/v1/note')
          .then(res => expect(res.status).toBe(200));
      });

      // success - fetch all the notes
      it('should get all notes when no id is provided', () => {
        // this works since the post tests above added some test notes
        return superagent.get(':5555/api/v1/note')
          .then(res => expect(res.body).not.toBe(null));
      });

      // success - fetch a single note
      it('should get the note requested when an id is provided', () => {
        // first, add a note and acquire its id, then request that note
        return superagent.post(':5555/api/v1/note')
          .send({title: 'note3', content: 'Wowzers!'})
          .then(res => {
            let id = res.body._id;
            return superagent.get(`:5555/api/v1/note?_id=${id}`)
              .then(res2 => {
                expect(res2.body._id).toBe(id);
              });
          });
      });
    });
  });
});
