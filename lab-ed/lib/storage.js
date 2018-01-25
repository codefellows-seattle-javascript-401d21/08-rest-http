'use strict'

const debug = require('debug')('http:storage')
const storage = module.exports = {}
const memory = {}

storage.create = function(schema, item) {
  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Can\'t create new item; schema and item req'))

    if(!memory[schema]) memory[schema] = {}
    memory[schema][item._id] = item
    return resolve(memory[schema][item._id])
  })
}

storage.fetchOne = function() {
}

storage.fetchAll = function() {
}

storage.update = function() {
}

storage.delete = function() {
}
