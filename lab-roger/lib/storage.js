'use strict';
const debug = require('debug')('http:storage');
const storage = module.exports = {};
const memory = {};

storage.create = function(schema, item) {
  debug('created new item in storage');
  return new Promise((resolve, reject) => {
    if (!schema || !item) return reject(new Error('Cannot create a new item; Schemna and Item required'));
    if(!memory[schema]) memory[schema] = {};
    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);
  });
};


storage.fetchAll = function(schema) {
  debug('in the fetch module', memory);
  return new Promise((resolve, reject) => {
    if(!schema) {
      return reject(new Error('No such catagory'));
    }
    return resolve(memory[schema]);
  });

};

// storage.update = function(schema, item) {
//
// };
storage.delete = function(schema, id) {
  debug('in the delete module', memory);
  return new Promise((resolve, reject) => {
    if(!memory[schema] || !memory[schema][id]) {
      return reject(new Error('no item found to delete'));
    }
    delete memory[schema][id];
    return resolve(memory[schema]);

  });

};
