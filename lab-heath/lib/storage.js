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
//     ...
//   },
// }
// /Users/heathsmith/codefellows/401/401-lab/08-rest-http/lab-heath/data/1234.json

storage.create = function(schema, item) {
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; schema and Item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.fetchOne = function(schema, itemId) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, Cannot find record. Schema required.'));
    if(!itemId) return reject(new Error('400, Cannot find record. Item ID required.'));
    if(!memory[schema][itemId]) return reject(new Error('404, Cannot find record. Does not exist.'));

    return resolve(memory[schema][itemId]);
  });
};

storage.fetchAll = function(schema) {
  debug('getting all the things!');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400,Cannot get any items from the memory, Schema required.')); 
    if(!memory[schema]) return reject(new Error('404,Cannot complete request. no record match schema')); 

    let ids = Object.keys(memory[schema]);
    return resolve(ids);
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

storage.delete = function(schema, itemId) {
  console.log('inside the stroage', itemId);
  debug('Deleting a thing');
  return new Promise((resolve, reject) => {
    debug('test', memory[schema]);
    if(!schema || !itemId) return reject(new Error('Cannot delete item, item not found')); 
    delete memory[schema][itemId];
    return resolve();
  });
};