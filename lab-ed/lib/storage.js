'use strict'

const storage = module.exports = {}
const memory = {

  'Note': {
    '394f2dfd-2865-44ba-99da-425ebdd76c85': {
      '_id': '394f2dfd-2865-44ba-99da-425ebdd76c85',
      'content': 'bar',
      'title': 'foo',
    },
    '77a6fd8a-aff9-46f5-b8c4-32a45a4d8f26': {
      '_id': '77a6fd8a-aff9-46f5-b8c4-32a45a4d8f26',
      'content': 'foo',
      'title': 'bar',
    },
  },
}

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
  return new Promise((resolve) => {

    return resolve(memory)
  })
}

storage.update = function() {
}

storage.delete = function(schema, id) {
  return new Promise((resolve) => {
    delete memory[schema][id]
    return resolve(id)
    
  })
}
