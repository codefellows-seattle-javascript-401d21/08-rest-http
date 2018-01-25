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

//   },
// },

storage.create = function (schema, item) {
  debug('Created a new thing');
  return new Promise((resolve, reject) => {
    if (!schema || !item) return reject(new Error('Cannot create new item; Schema and Item required'));
    if (!memory[schema]) memory[schema] = {};
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.fetch = function (schema, _id) {
  debug(`Fetched note: ${_id}`);
  return new Promise((resolve, reject) => {
    if(!schema || !_id) return reject(new Error('Note does not exist;'));
    return resolve(memory[schema][_id]);
  });
};

storage.fetchAll = function (schema) {
  debug(`Fetching All Notes`);
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot retrieve all of undefined schema;'));
    return resolve(memory[schema]);
  });
};

storage.update = function (schema, item) {
  debug('Updated a thing');
  return new Promise((resolve, reject) => {
    if (!schema || !item || !memory[schema][item._id]) return reject(new Error('Cannot update item; Schema and Item required'));
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function (schema, _id) {
  debug('Deleted a thing');
  return new Promise((resolve, reject) => {
    if (!schema || !_id) return reject(new Error('Cannot delete unknown item; Schema and Item required'));
    delete memory[schema][_id];
    return resolve(_id);
  });
};