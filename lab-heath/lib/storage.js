'use strict';

const debug = require('debug')('http:storage');
const storage = module.exports = {};
const memory = {};

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
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item; 
    return resolve(item);
  });
};


storage.fetchAll = function(schema) {
  debug('getting all the things!');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot get any items from the memory')); 

    return resolve(memory[schema]);
  });
};

storage.update = function(schema, item) {
  debug('updating that item!');
  return new Promise((resolve, reject) => {
    if(!item) return reject(new Error('Cannot update this item')); 

    memory[schema][item._id] = item; 
    return resolve(item);
  });
};

storage.delete = function(schema, item) { 
  debug('Deleting a thing');
  debug('this is the id',item.body.id);
  return new Promise((resolve, reject) => {
    debug('test', memory[schema]);
    if(!schema || !item) return reject(new Error('Cannot delete item, item not found'))
    delete memory[schema][item.body.id];
    return resolve(memory[schema]);
  });
};