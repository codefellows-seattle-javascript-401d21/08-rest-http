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
    if(!item) return reject(new Error('Cannot update, need item'));
   
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function(schema, item) {
  // debug('test', memory[schema]);
  debug('Deleting a thing');
  debug('this is the id',item.body.id);

  return new Promise((resolve, reject) => {
    debug('test', memory[schema]);
    if(!schema || !item) return reject(new Error('Cannot delete item, item not found'))
    
    delete memory[schema][item.body.id];
    return resolve(memory[schema]);
  });
};
