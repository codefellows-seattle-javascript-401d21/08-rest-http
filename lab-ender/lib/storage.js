'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};

storage.create = function(schema, item) {
  debug(`storing a new ${schema}`);
  return new Promise((resolve, reject) => {
    if (!schema || !item) {
      return reject(new Error('Cannot store new item; Schema and Item required'));
    };
    if (!memory[schema]) memory[schema] = {};
    memory[schema][item._id] = item;
    debug(`storing to memory.${schema}.${item._id}`)
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchOne = function(schema, id) {
  debug(`fetching a ${schema}`);
  return new Promise((resolve, reject) => {
    if (!schema || !id) {
      return reject(new Error(`Cannot fetch item "${id}" from schema "${schema}"; Schema and Item required`));
    } else if (!memory[schema]) {
      return reject(new Error(`Cannot fetch item; "${schema}" schema not found`));
    } else if (!memory[schema][id]) {
      return reject(new Error(`Cannot fetch item; "${id}" ${schema} not found`));
    };
    return resolve(memory[schema][id]);
  });
};

storage.fetchAll = function(schema) {
  debug(`fetching all ${schema}s`);
  debug(`memory.${schema}: ${JSON.stringify(memory[schema])}`);
  return new Promise((resolve, reject) => {
    if (!schema) {
      return reject(new Error('Cannot fetch items; Schema required'));
    };
    if (!memory[schema]) {
      return reject(new Error(`Cannot fetch items; "${schema}" schema not found`));
    };
    return resolve(memory[schema]);
  });
};

storage.update = function() {

};

storage.delete = function() {

};
