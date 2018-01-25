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
    if(!schema || !memory[schema]) return reject(new Error('Cannot create a new item; Schema and Item required'));

    return resolve(memory[schema]);
  });
};

storage.delete = function(item) {
  debug('Delete the things!');

  return new Promise((resolve, reject) => {
    if(memory[item._id]) {
      delete memory[item._id];
      return resolve;
    }
    return reject(new Error('Cannot create a new item; Schema and Item required'));
  });
};

storage.update = function() {

};
