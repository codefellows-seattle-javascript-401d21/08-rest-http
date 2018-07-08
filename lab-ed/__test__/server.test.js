'use strict'

'use strict'

const server = require('../lib/server')
const superagent = require('superagent')

describe('Server module', function() {
  beforeAll(() => server.start(4444))
  afterAll(() => server.stop())

  describe('Bad Request to the API', () => {
    describe('GET /Note', () => {
      it('should respond with a status 400', () => {
        return superagent.get(':4444/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400)
          })
      })
    })
  })

  describe('Valid Request to the API', () => {
    describe('GET /Note', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/api/v1/note')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
    })
  })

  describe('Bad Request to the API', () => {
    describe('POST /Note', () => {
      it('should respond with a status 400', () => {
        return superagent.post(':4444/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400)
          })
      })
    })
  })
      
  describe('Valid Request to the API', () => {
    describe('POST /Note', () => {
      it('should respond with a status 201', () => {
        return superagent.post(':4444/api/v1/note')
          .send({title: 'world', content: 'hello'})
          .then(res => {
            expect(res.status).toBe(201)
          })
      })
    })
  })

  describe('Bad Request to the API', () => {
    describe('PUT /Note', () => {
      it('should respond with a status 400', () => {
        return superagent.put(':4444/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400)
          })
      })
    })
  })

  describe('Valid Request to the API', () => {
    describe('PUT /Note', () => {
      it('should respond with a status 204', () => {
        return superagent.put(':4444/api/v1/note')
          .send({id: '394f2dfd-2865-44ba-99da-425ebdd76c85', title: 'are cool', content: 'Rocks'})
          .then(res => {
            expect(res.status).toBe(204)
          })
      })
    })
  })

  describe('Bad Request to the API', () => {
    describe('DELETE /Note', () => {
      it('should respond with a status 400', () => {
        return superagent.delete(':4444/api/v1/note')
          .catch(err => {
            expect(err.status).toBe(400)
          })
      })
    })
  })

  describe('Valid Request to the API', () => {
    describe('DELETE /Note', () => {
      it('should respond with a status 204', () => {
        return superagent.delete(':4444/api/v1/note')
          .send({id: '394f2dfd-2865-44ba-99da-425ebdd76c85'})
          .then(res => {
            expect(res.status).toBe(204)
          })
      })
    })
  })
})
 