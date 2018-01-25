'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};


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
    if(!schema) return reject(new Error('400. Cannot find record, need schema'));
    if(!itemId) return reject(new Error('400. Cannot find file, need item id'));
    if(!memory[schema][itemId]) return reject(new Error ('404. Cannot find record, does not exist'));

    return resolve(memory[schema][itemId]);
  });
  

};

storage.fetchAll = function(schema) {
  debug('Fetch All things');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot get item, need a schema'));
    if(!memory[schema]) return reject(new Error('404, cannot complete, no records match schema'));

    let ids = Object.keys(memory[schema]);
    return resolve(ids);
  });
};

storage.update = function(schema, item) {
  debug('Updating a thing');

  return new Promise((resolve, reject) => {
    if(!item) return reject(new Error('Cannot update, need id'));
   
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function(schema, itemId) {
  debug('Deleting a thing');

  return new Promise((resolve, reject) => {
    debug('test', memory[schema]);
    if(!schema || !itemId) return reject(new Error('Cannot delete item, item not found'));
    
    delete memory[schema][itemId];
    return resolve();
  });
};
