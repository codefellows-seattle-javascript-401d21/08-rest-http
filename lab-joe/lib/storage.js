'use strict'

const debug = require('debug')('http:storage')

const storage = module.exports = {}
// const memory = {}

let memory = {}

// memory = {
//   'Notes': {
//     '1234.5678.9012': {
//       '_id': '1234.5678.9012',
//       'title': '',
//       'content': '',
//     },
//   },
//   'Categories': {
//     ...
//   },
// }


storage.create = function(schema, item) {
  debug('Created a new thing')

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'))

    if(!memory[schema]) memory[schema] = {}

    memory[schema][item._id] = item
    return resolve(memory[schema][item._id])
  })
}

storage.fetchOne = function(schema, itemId) {

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, Cannot find record. Schema required.'))
    if(!itemId) return reject(new Error('400, cannot find record. item id required'))
    if(!memory[schema][itemId]) return reject(new Error('404, cannot find record. does not exist.'))
  
    return resolve(memory[schema][itemId])
  })
}



storage.fetchAll = function(schema) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, cannot find record. schema required.'))
    if(!memory[schema]) return reject(new Error('404 cannot complete request. no records match schema.'))
    
    let ids = Object.keys(memory[schema])

    return resolve(ids)
    
  
  })

}

storage.update = function(schema, itemId, note) {

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, cannot find record. schema required.'))
    if(!itemId) return reject(new Error('400, cannot find record. itemId required.'))
    if(!note) return reject(new Error('400, cannot find record. note required.'))
    if(!memory[schema]) return reject(new Error('404 cannot complete request. no records match schema.'))
  
  note._id = itemId 
  memory[schema][itemId] = note
  console.log(memory)

        return resolve(memory)
    
  })

}

storage.delete = function(schema, itemId) {

console.log('you got here')
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, cannot find record. schema required.'))
    if(!itemId) return reject(new Error('400, cannot find record. itemId required.'))
    if(!memory[schema]) return reject(new Error('404 cannot complete request. no records match schema.'))
  
    delete memory[schema][itemId];
    return resolve(memory)
    
  })


}
