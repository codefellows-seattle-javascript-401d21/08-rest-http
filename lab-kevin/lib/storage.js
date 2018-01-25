'use strict';

const debug = require('debug')('http:storage-constructor');

const storage = module.exports = {};

const memory = {};

storage.create = function(schema, item){
  debug('#New item');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));

    if(!memory[schema]) memory[schema] = {};
    memory[schema][item.id] = item;
    return resolve(memory[schema][item.id]);
  });
};

