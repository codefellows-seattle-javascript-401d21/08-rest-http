'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};


storage.create = function(schema, item) {
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;
    return resolve(item);
  });
};

// storage.fetchOne = function() {
  

// };

storage.fetchAll = function(schema) {
  debug('Fetch All things');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot get item, need a schema'));

    return resolve(memory[schema]);
  });
};

storage.update = function(schema, item) {
  debug('Updating a thing');

  return new Promise((resolve, reject) => {
    if(!item._id) return reject(new Error('Cannot update, need item'));
    // if(!memory[schema][item._id]) return reject(new Error('Cannot update, need an id'));

    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function(schema, item) {
  debug('Deleting a thing');
  
  return new Promise((resolve, reject) => {
    if(memory[schema][item._id]) {
      delete memory[schema][item._id];
      return resolve();
    }
    return reject(new Error('Cannot delete item, item not found'));
  });
};
