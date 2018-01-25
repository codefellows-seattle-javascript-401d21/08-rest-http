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
};

storage.fetchOne = function(schema, itemID) {
  debug('Got the thing');

  return new Promise((resolve, reject) => {
    if(!schema || !itemID) return reject(new Error('Cannot get item; Schema and itemID required'));

    if(!memory[schema]) return reject(new Error('Cannot get item; Schema does not exist'));

    if(!memory[schema][itemID]) return reject(new Error('Cannot get item; itemID does not exist'));

    return resolve(memory[schema][itemID]);
  });
};

storage.fetchAll = function(schema) {
  debug('Got ALL the things');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot get items; Schema required'));

    if(!memory[schema]) return reject(new Error('Cannot get items; Schema does not exist'));

    return resolve(memory[schema]);
  });
};

storage.update = function(schema, item) {
  debug('Updated the thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot update item; Schema and Item required'));

    if(!memory[schema] || !memory[schema][item._id]){
      debug(`The thing didn't exist...`);
      storage.create(schema, item);
      return resolve(memory[schema][item._id]);
    } 

    memory[schema][item._id] = item;
    return resolve();
  });
};

storage.delete = function(schema, itemID) {
  debug('Deleted the thing');

  return new Promise((resolve, reject) => {
    // console.log(schema, itemID)
    if(!schema || !itemID) {
      return reject(new Error('Cannot delete item; Schema and Item required'));
    }

    if(!memory[schema] || !memory[schema][itemID]) {
      return reject(new Error('Cannot delete item; Schema or itemID does not exist'));
    }
    delete memory[schema][itemID];
    return resolve();
  });
};
