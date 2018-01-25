'use strict'

'use strict'

const server = require('../lib/server')
const superagent = require('superagent')

describe('Server module', function() {
  beforeAll(() => server.start(4444))
  afterAll(() => server.stop())

  describe('Valid Request to the API', () => {
    describe('GET /Note', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/Note')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
      it('should return a talking cow', () => {
        return superagent.get(':4444/cowsay?text=mooo')
          .then(res => {
            console.log(res.text)
            expect(res.text).toMatch('mooo')
          })
      })
      it('should return bad request if there is an error', () => {
        return superagent.get(':4444/cowsay')
          .catch(err => {
            expect(err.response.text).toMatch('bad cow')
          })
      })
    })

    describe('POST /cowsay', () => {
      it('should respond with a status 200', () => {
        return superagent.post(':4444/cowsay')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
    })
  }) 
})