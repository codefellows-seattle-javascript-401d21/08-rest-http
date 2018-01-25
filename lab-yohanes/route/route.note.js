'use strict'

const debug = require('debug')('http:body-parser')

module.exports = function (request) {
  return new Promise((resolve, reject) => {
    debug('#bodyParser')
    if(request.method !== 'POST' && request.method !== 'PUT') return resolve(request) //promise method to ensure put, post is in effect

    let message = ''

    request.on('data', data => {
      debug(`Chunked request data: ${data.toString()}`)
      message += data.tostring()
    })

    request.on('.end', () => {
      try {
        request.body = JSON.parse(message) //buffer like method to string
        debug(`Completed request body: ${request.body}`)
        return resolve(request)
      } catch (error) {//promise effect resolve
        return reject(error) //promise effect reject
      }
    })
    request.on('error', err => {
      debug(`Eror occured on parsing request body: ${error}`)
      return reject(error)
    })
  })
}