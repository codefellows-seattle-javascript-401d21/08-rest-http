const server = require('../lib/server');
const superagent = require('superagent');

describe('server.js', () => {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('POST', () => {
    test('should return status 201', () => {
      return superagent.post(':4444/api/v1/note')
        .send({text: 'test', content: 'testing'})
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
});
