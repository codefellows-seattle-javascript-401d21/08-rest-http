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
}
*/

storage.create = function(schema, item){

  debug('Created a new thing');

  return new Promise((resolve, reject) => {

    // if arguments are not passed in
    if(!schema || !item){
      return reject(new Error('Cannot create a new item; Schema and Item required'));
    }

    // if passed schema doesn't exists in database(= storage)
    if(!memory[schema]){
      // create the schema so we can save item in it
      memory[schema] = {};
    }

    // save the item in database(= storage)
    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchOne = function(schema, itemId){

  debug('Fetched a thing');

  return new Promise((resolve, reject) => {
    if(!schema){
      return reject(new Error('400, Cannot find the record.  Schema required.'));
    }
    if(!itemId){
      return reject(new Error('400, Cannot find the record.  ID required.'));
    }
    if(!memory[schema][itemId]){
      return reject(new Error('404, Record does not exists'));
    }

    return resolve(memory[schema][itemId]);
  });
};

storage.fetchAll = function(schema){

  debug('Fething all');

  return new Promise((resolve, reject) => {

    if(!schema){
      return reject(new Error('400, Cannot find the record. Schema required'));
    }

    if(!memory[schema]){
      return reject(new Error('404, No record in schema'));
    }

    let ids = Object.keys(memory[schema]);
    return resolve(ids);
  });
};

storage.update = function(schema, itemId, newData){
//console.log('item in storage.update');
//console.log(item);
  return new Promise((resolve, reject) => {

    if(!schema){
      return reject(new Error('Cannot update. Schema required.'));
    }
    if(!itemId){
      return reject(new Error('Cannot update. Item ID required.'));
    }
    if(!newData){
      return reject(new Error('Cannot update. New data required.'));
    }

    // update existing note with new data
    let keysInNewData = Object.keys(newData);
    let existingNote = memory['Note'][itemId];
    for(let i = 0; i < keysInNewData.length; i++){
      let key  = keysInNewData[i];
      if(newData[key]){
        existingNote[key] = newData[key];
      }
    }

    return resolve();
  });
};

storage.deleteOne = function(schema, itemId){

  debug('Delete one');

  return new Promise((resolve, reject) => {
    if(!schema){
      return reject(new Error('400, Cannot find the record.  Schema required.'));
    }
    if(!itemId){
      return reject(new Error('400, Cannot find the record.  ID required.'));
    }
    if(!memory[schema][itemId]){
      return reject(new Error('404, Record does not exists'));
    }

    delete memory[schema][itemId];
    return resolve();
  });
/*  return new Promise((resolve, reject) => {

    if(!schema || !_id){
      return reject(new Error('Cannot delete the item; Schema and Item required'));
    }

    if(!memory[schema][_id]){
      return reject(new Error('Cannot find the item'));
    }
     
    delete memory[schema][_id];
    return resolve({});

  });*/
};

storage.deleteAll = function(schema){

  debug('Delete all');

  return new Promise((resolve, reject) => {

    if(!schema){
      return reject(new Error('400, Cannot find the record. Schema required'));
    }

    if(!memory[schema]){
      return reject(new Error('404, No record in schema'));
    }

    memory[schema] = {};
    return resolve();
  });
/*  return new Promise((resolve, reject) => {

    if(!schema){
      return reject(new Error('Cannot delete the items; Schema required'));
    }

    if(!memory[schema]){
      return reject(new Error('Cannot find the data'));
    }
    
    memory[schema] = {};
    return resolve({});

  });*/
};
