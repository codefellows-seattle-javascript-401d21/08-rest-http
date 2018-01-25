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
    return resolve(memory[schema][item._id]);
  });
}

storage.fetchOne = function(schema, item) {
  debug('Fetched a thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot find item; Schema and Item required'));
    return resolve(memory[schema][item]);
  });
}

storage.fetchAll = function(schema) {
  debug('Fetched things');

  return new Promise((resolve, reject) => {
    if(!schema || !memory[schema]) return reject(new Error('Cannot create a new item; Schema and Item required'));
    return resolve(memory[schema]);
  });
}

storage.update = function(schema, item) {
  debug('updating that item!');
  return new Promise((resolve, reject) => {
    if(!item) return reject(new Error('Cannot update this item'));
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function(schema, _id) {
  debug('Deleted a thing');
  return new Promise((resolve, reject) => {
    if(!schema || !_id) {
      return reject(new Error('Cannot delete unknown item; Schema and Item required'));
    }
    delete memory[schema][_id];
    return resolve(_id);
  })
};
