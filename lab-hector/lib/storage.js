'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};


storage.create = function (schema, item) {
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if (!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));

    if (!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchOne =  function (schema, itemID) {
  return new Promise((resolve, reject) => {

    if (!schema) return reject(new Error('Cannot get item; schema required'));
    if (!itemID) return reject(new Error('Cannon get item; itemId required'));
    if (!memory[schema]) return reject(new Error('Cannot get item; schema does not exist'));
    if (!memory[schema][itemID]) return reject(new Error('Cannot get item; item does not exist'));

    return resolve(memory[schema][itemID]);
  });
};

storage.fetchAll = function (schema) {
  return new Promise((resolve, reject) => {

    if(!schema) return reject(new Error('Cannot get items; schema required'));
    if(!memory[schema]) return reject(new Error('Cannot get items; schema not exist'));

    return resolve(memory[schema]);

  });
};


storage.update = function (schema, item) {
  return new Promise((resolve, reject) => {

    if(!schema) return reject(new Error('Cannot update item; schema required'));
    if(!item) return reject(new Error('cannot update item; item required'));
    
    return resolve();

  });
};

storage.delete = function (schema, itemId) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('cannot get item; schema required'));
    if (!itemId) return reject(new Error('cannon get item; itemId required'));
    if (!memory[schema]) return reject(new Error('cannot get item; schema does not exist'));
    if (!memory[schema][itemId]) return reject(new Error('cannot get item; item does not exist'));

    delete memory[schema][itemId];
    return resolve();
  });
};



//this is an example to see how it would be constructed

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