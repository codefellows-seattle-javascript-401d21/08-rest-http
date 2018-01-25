'use strict';

const debug = require('debug')('http:storage'); //debug pathname

const storage = module.exports = {};
const memory = {}; //empty object

storage.create = function(schema, item){
  debug('Created a new item');
  debug( 'Schema', schema);
  return new Promise((resolve, reject) => {
    if (!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));

    if (!memory[schema]) memory[schema] = {};
    debug('item', item);
    debug('new schema?', schema);
    memory[schema][item._id] = item;
    return resolve (memory[schema][item._id]);
  });
};

storage.fetchAll = function (schema) {
  debug('Got all items', schema);

  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot get items; no data'));

    debug('What is in memory?', memory[schema]);

    return resolve (memory[schema]);

  });
};

storage.update = function (schema, item) {
  debug('Updated an item');

  return new Promise((resolve, reject) => {
    if (!schema || !item) return reject(new Error('Cannot update item; Schema and Item required'));

    memory[schema][item._id] = item;
    return resolve (memory[schema][item._id]);
  });

};

storage.delete = function () {
  debug('Deleted an item');
};
