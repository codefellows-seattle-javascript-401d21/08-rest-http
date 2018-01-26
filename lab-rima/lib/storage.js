'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};
/*const memory = {
   'Note': {
     '1': {
       '_id': '1',
       'title': 'One',
       'content': 'oneoneone',
     },
     '2': {
       '_id': '2',
       'title': 'Two',
       'content': 'twotwotwo',
     },
     '3': {
       '_id': '3',
       'title': 'Three',
       'content': 'threethreethree',
     },
   },
}*/


storage.create = (schema, item) => {

  debug('Created a new thing');

  return new Promise((resolve, reject) => {

    if(!schema || !item){
      return reject(new Error('Cannot create a new item; Schema and Item required'));
    }

    if(!memory[schema]){
      memory[schema] = {};
    }

    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);

  });
};

storage.fetchOne = (schema, _id) => {

  debug('Fetched a thing');

  return new Promise((resolve, reject) => {
    if(!schema || !_id){
      return reject(new Error('Cannot fetch the item; Schema and ID required.'));
    }

    if(memory[schema][_id]){
      return resolve(memory[schema][_id]);
    }


    return reject(new Error('Requested ID does not exist.'));
  });
};

storage.fetchAll = (schema) => {

  debug('Fething all');

  return new Promise((resolve, reject) => {

    if(!schema){
      return reject(new Error('Cannot fetch all; Schema required'));
    }

    if(!memory[schema]){
      return reject(new Error('No data'));
    }

    return resolve(memory[schema]);

  });
};

storage.update = (schema, item) => {


  return new Promise((resolve, reject) => {
    try{
      if(!schema || !item){
        return reject(new Error('Cannot update the item; Schema and Item required'));
      }

      if(!memory[schema][item._id]){
        return reject(new Error('Cannot find the item'));
      }

      memory[schema][item._id] = item;
      return resolve(memory[schema][item._id]);
    } catch(err) {
      return reject(err);
    }

  });
};

storage.delete = (schema, _id) => {

  debug('Delete one');

  return new Promise((resolve, reject) => {

    if(!schema || !_id){
      return reject(new Error('Cannot delete the item; Schema and Item required'));
    }

    if(!memory[schema][_id]){
      return reject(new Error('Cannot find the item'));
    }
     
    delete memory[schema][_id];
    return resolve({});

  });
};

storage.deleteAll = (schema) => {

  debug('Delete all');

  return new Promise((resolve, reject) => {

    if(!schema){
      return reject(new Error('Cannot delete the items; Schema required'));
    }

    if(!memory[schema]){
      return reject(new Error('Cannot find the data'));
    }
    
    memory[schema] = {};
    return resolve({});

  });
};
