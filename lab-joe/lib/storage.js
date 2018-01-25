'use strict'

const debug = require('debug')('http:storage')

const storage = module.exports = {}
// const memory = {}

let memory = {'first':'this is the first',
'second':'this is the second',
'third':'this is the third',
'fourt':'this is the fourth'
}

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

let arr = [];

storage.create = function(schema, item) {
  debug('Created a new thing')

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'))

    if(!memory[schema]) memory[schema] = {}

    memory[schema][item._id] = item
    return resolve(memory[schema][item._id])
  })

  memory[item] = schema 

}

// storage.fetchOne = function(item) {

// console.log(memory)

// }

storage.fetchOne = function(item) {
// console.log(item)
  console.log(memory[`${item}`])



  return memory[`${item}`]

  
  }



storage.fetchAll = function() {

}

storage.update = function(item,note) {
memory[`${note}`] = item;
console.log(memory)
}

storage.delete = function(note) {
delete memory[`${note}`];
console.log(memory)
}


