'use strict';

const storage = module.exports = {};
const memory = {};
const debug = require('debug')('http:storage');

storage.create = function(schema, item) {
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    debug('Adding a new item to memory.');
    // Validate first
    if(!schema || !item)
      return reject(new Error('Cannot create a new item; Schema and Item required'));

    // If the schema doesn't exist already, create it
    if(!memory[schema]) memory[schema] = {};

    // Add the new item
    memory[schema][item._id] = item;

    // Return the item
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchOne = function (schema, _id) {
  debug(`Fetching single ${schema} with id "${_id}".`);

  return new Promise((resolve, reject) => {
    // Check the schema
    if (!schema || !memory[schema])
      return reject(new Error('Cannot fetch One; Schema required'));
    // Check the id
    if (!memory[schema][_id])
      return reject(new Error('Cannot fetch One; Id required'));

    return resolve(memory[schema][_id]);
  });
};

storage.fetchAll = function (schema) {
  debug(`Fetching all ${schema}'s from memory.`);

  return new Promise((resolve, reject) => {
    // Check the schema
    if(!schema || !memory[schema])
      return reject(new Error('Cannot fetch All; Schema required'));

    return resolve(memory[schema]);
  });
};

storage.update = function() {
  // TODO: Implement me
};

storage.delete = function() {
  // TODO: Implement me
};

