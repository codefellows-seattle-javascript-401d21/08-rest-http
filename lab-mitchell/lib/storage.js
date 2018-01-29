'use strict';

//this whole storage module nothing more than an object with CRUD methods on it

const debug = require('debug')('http:storage');

const storage = module.exports = {}; //registers export as empty object, to assign CRUD methods to
const memory = {}; //empty memory object to put stuff in (CREATE), UPDATE from, READ (fetchOne/fetchAll), and DELETE from 

//this is what the memory object looks like with the memory[schema][item._id][title] stuff below. notice item is same as item._id from line 35
// memory = {
//   'notes': {
//     '1234.5678.9012': {
//       '_id': '1234.5678.9012',  
//       'title': '',
//       'content': '',
//     },
//     'categories': {

//     },
//   }
// }

//EACH OF THESE METHODS WILL RETURN A PROMISE
//STORAGE is public interface to MEMORY OBJECT, how we export functions to take action on memory object
//VALIDATION HAPPENS HERE, validate all info needed before we actually hit the persistence layer/set thing into memory storage
storage.create = function(schema, item) { //create storage method expecting schema and item arguments
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item, schema and item required'));

    if(!memory[schema]) memory[schema] = {}; //if it doesn't exist as a key in memory, set value of schema in memory as empty object to put more stuff into

    memory[schema][item._id] = item; //sets the item._id key/property of schema object in memory to the given item
    return resolve(memory[schema][item._id]); //resolves and passes the item._id of schema in memory on
  });
};

storage.fetchOne = function(schema, itemId) {
  return new Promise((resolve, reject) => { //return Promise so that when we return any of the methods we can handle them asynchronously, ensuring that before the .then or .catch the storage part occurs
    if(!schema) return reject(new Error('400 Cannot find record, schema required')); //validate there is a schema
    if(!itemId) return reject(new Error('400 Cannot find record, itemId required')); //validate there is an itemId
    if(!memory[schema][itemId]) return reject(new Error('404 Cannot find record, does not exist')); //if memory @ schema @ itemId DNE, return reject new Error

    return resolve(memory[schema][itemId]);
  });
};

storage.fetchAll = function(schema) { //don't need specific ID b/c getting all
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('400 Cannot find record, schema required')); //validate there is a schema
    if (!memory[schema]) return reject(new Error('404 cannot complete request, no records match schema')); //validate schema exists in our persistence layer

    //memroy[schema] gets us an object with all of our nodes, which we then pass into objet.keys which generates an array with all of the keys for each note
    let ids = Object.keys(memory[schema]); //packages up all the ids we need

    return resolve(ids); //ships those ids back
  });
};

storage.update = function(schema, item) { //item is body of data that's passed, itemID is property on item 
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400 Cannot find record, schema required')); //validate there is a schema
    if(!item) return reject(new Error('400 Cannot find record, item required')); //validate there is an item

    memory[schema][item._id] = item; //reassigns value of specific item._id to the updated item
    return resolve();
  });
};

storage.delete = function(schema, itemId) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('400 Cannot find record, schema required')); //validate there is a schema
    if (!itemId) return reject(new Error('400 Cannot find record, itemId required')); //validate there is an itemId
    if (!memory[schema][itemId]) return reject(new Error('404 Cannot find record, does not exist')); //if memory @ schema @ itemId DNE, return reject new Error

    delete memory[schema][itemId]; //deletes that unique item
    return resolve();  
  });
};