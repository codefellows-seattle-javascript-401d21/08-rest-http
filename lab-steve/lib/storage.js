'use strict';

const storage = module.exports = {};
const memory = {};
const debug = require('debug')('http:storage');

storage.create = function(schema, item) {
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    debug('Adding a new item to memory.');
    if (!schema || !item)
      return reject(new Error('Cannot create a new item; Schema and Item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;

    return resolve(memory[schema][item._id]);
  });
};

storage.fetchOne = (schema, _id) => {
  debug(`Fetching single ${schema} with id "${_id}".`);

  return new Promise((resolve, reject) => {
    if (!schema)
      return reject(new Error('Error: No schema provided!'));
    if (!_id)
      return reject(new Error('Error: No _id provided!'));
    if (!memory[schema])
      return reject(new Error(`Error: Schema ${schema} has no elements!`))
    if (!memory[schema][_id])
      return reject(new Error(`Error: Schema ${schema}, element id ${_id} does not exist`));

    return resolve(memory[schema][_id]);
  });
};

storage.fetchAll = (schema) => {
  debug(`Fetching all ${schema}'s from memory.`);

  return new Promise((resolve, reject) => {
    if (!schema)
      return reject(new Error('Error: No schema provided!'));
    if (!memory[schema])
      return reject(new Error(`Error: Schema ${schema} has no elements!`));

    return resolve(memory[schema]);
  });
};

storage.update = (schema, ele) => {
  debug(`Updating schema ${schema} element`);

  return new Promise((resolve, reject) => {
    if (!schema)
      return reject(new Error('Error: No schema provided!'));
    if (!ele)
      return reject(new Error('Error: No element to update provided!'));
    if (!memory[schema])
      return reject(new Error('Error: Schema does not exist!'));
    if (!memory[schema][ele._id])
      return reject(new Error('Error: Element does not exist!'));

    // update it!
    memory[schema][ele._id] = ele;

    return resolve(ele);
  });
};

storage.delete = (schema, _id) => {
  debug(`Deleting element id=${_id} from ${schema} schema`);

  return new Promise((resolve, reject) => {
    if (!schema)
      return reject(new Error('Error: No schema provided!'));
    if (!_id)
      return reject(new Error('Error: No element _id to delete provided!'));
    if (!memory[schema])
      return reject(new Error('Error: Schema does not exist!'));
    if (!memory[schema][_id])
      return reject(new Error('Error: Element does not exist!'));

    delete memory[schema][_id];

    return resolve(_id);
  })
};

