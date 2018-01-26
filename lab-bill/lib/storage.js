'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};

storage.create = function(schema, item) {
  debug('Created a new thing');
  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item, schme and item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchAll = function(schema) {
  debug('Fetch all the things!');

  return new Promise((resolve, reject) => {
    if(!schema || !memory[schema]) return reject(new Error('Cannot fetch all; Schema required'));

    let ids = Object.keys(memory[schema]);
    return resolve(ids);
    // return resolve(memory[schema]);
  });
};

storage.fetchOne = function(schema,item) {
  debug('Fetch one thing!');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot fetch one; Schema and Item required'));
    return resolve(memory[schema][item]);
  });
};

storage.update = function(schema, item, itemId) {
  debug('updating item');
  return new Promise((resolve, reject) => {
    if(!item) return reject(new Error('Cannot update this item'));
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function(schema, id) {
  debug('deleting the item');
  return new Promise((resolve, reject) => {
    if(!id) return reject(new Error('Cannot delete this item'));
    if(!memory[schema][id]) return reject(new Error('This id does not exist'));
    delete memory[schema][id];
    return resolve(memory[schema]);
  });
};