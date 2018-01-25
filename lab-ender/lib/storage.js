'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};

storage.create = function(schema, item) {
  debug('created a new thing');

  return new Promise((resolve, reject) => {
    if (!schema || !item) {
      return reject(new Error('Cannot create new item; Schema and Item required'));
    };

    if (!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchOne = function(schema, item) {
  debug('fetched a thing');

  return new Promise((resolve, reject) => {
    if (!schema || !item) {
      return reject(new Error('Cannot fetch item; Schema and Item required'));
    };
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchAll = function(schema) {
  debug('fetched all things');
  debug(memory);
  return new Promise((resolve, reject) => {
    if (!schema) {
      return reject(new Error('Cannot fetch items; Schema required'));
    };
    return resolve(memory[schema]);
  });
};

storage.update = function() {

};

storage.delete = function() {

};
