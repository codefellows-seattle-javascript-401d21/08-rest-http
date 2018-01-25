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


storage.fetchOne = function(schema, item) {

};
storage.fetchAll = function(schema, item) {

};
storage.update = function(schema, item) {

};
storage.delete = function(schema, item) {

};
