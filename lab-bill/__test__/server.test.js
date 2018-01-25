'use strict';


const superagent = require('superagent');
const server = require('../lib/server');

describe('POST', () => {
  beforeAll(() => server.start(3000));
  afterAll(() => server.stop());
  it('should respond with a status 201', () => {
    return superagent.post(`:3000/api/v1/note`)
      .send({title: 'Dune', content: 'this is the content'})
      .then(res => {
        // console.log(res);
        expect(res.status).toBe(201);
      });
  });
  it('should respond with a status 400 if no body is given', () => {
    return superagent.post(`:3000/api/v1/note`)
      .catch(err =>
        expect(err.status).toBe(400));
  });
});