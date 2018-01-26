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
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchAll = function(schema) {
  debug('Fetch all the things!');

  return new Promise((resolve, reject) => {
    if(!schema || !memory[schema]) return reject(new Error('Cannot fetch all; Schema required'));

    return resolve(memory[schema]);
  });
};

storage.fetchOne = function(schema,item) {
  debug('Fetch one thing!');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot fetch one; Schema and Item required'));
    return resolve(memory[schema][item]);
  });
};

storage.delete = function(schema, item) {
  debug('Deleting a thing!!');
  debug('this is a test', item.body.id);
  return new Promise((resolve, reject) => {
    debug('test', memory[schema]);
    if(!schema || !item) return reject(new Error('Cannot delete item, item not found'))
    delete memory[schema][item.body.id];
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
