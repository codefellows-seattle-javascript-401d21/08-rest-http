'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};

storage.create = function(schema, item) { //create storage method expecting schema and item arguments
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item, schema and item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchOne = function(schema, itemId) {
  return new Promise((resolve, reject) => { //return Promise so that when we return any of the methods we can handle them asynchronously, ensuring that before the .then or .catch the storage part occurs
    if(!schema) return reject(new Error('400 Cannot find record, schema required')); //validate there is a schema
    if(!itemId) return reject(new Error('400 Cannot find record, itemId required')); //validate there is an itemId
    if(!memory[schema][itemId]) return reject(new Error('404 cannot find record, does not exist')); //if memory @ schema @ itemId DNE, return reject new Error

    return resolve(memory[schema][itemId]);
  });
};

storage.fetchAll = function(schema) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('400 Cannot find record, schema required')); //validate there is a schema
    if (!memory[schema]) return reject(new Error('404 cannot complete request, no records match schema')); //validate schema exists in our persistence layer

    //memroy[schema] gets us an object with all of our nodes, which we then pass into objet.keys which generates an array with all of the keys for each note
    let ids = Object.keys(memory[schema]); //packages up all the ids we need

    return resolve(ids); //ships those ids back
  });
};

storage.update = function(schema, itemId, item) {

};

storage.delete = function(schema, itemId) {

};