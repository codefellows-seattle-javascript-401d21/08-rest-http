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

storage.update = function(schema, newNote) {
  debug('in the update module', memory);
  return new Promise((resolve, reject) => {
    if(!schema || !newNote) {
      return reject(new Error('no item found to delete'));
    }
    memory[schema][newNote.id] = newNote;
    return resolve(memory[schema]);
  });
};


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

storage.fetchOne = function(schema, id) {
  debug('in the fetchOne module', schema);
  debug('id to look for', id);
  return new Promise((resolve, reject) => {
    if(!memory[schema]) {
      return reject(new Error('no item found'));
    }
    //let objtosend = memory[schema][id];
    return resolve(memory[schema][id]);

  });

};
