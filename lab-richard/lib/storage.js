'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};

// memory = {
//     'Notes': {
//         '1234.5678.9012': {
//             'title': '',
//             'content': '',   
//         },
//     },
//     'Categories': {
//     }
// };


storage.create = function(schema, item) {
    debug('Created a new thing');

    return new Promise((resolve, reject) => {
        if(!schema || !item) return reject(new Error('Cannot create a new item. Schema and Item required'));
    
        if(!memory[schema]) memory[schema] = {};

        memory[schema][item._id] = item;
        return resolve(memory[schema[item._id]]);    
    });

};

storage.fetchOne = function() {
    return new Promise((resolve, reject) => {
        if(!schema || !itemId) return reject(new Error('Cannot find record. Schema and itemId required.'));
        if(!memory[schema] || !memory[schema][itemId]) return reject(new Error('404, Cannot find record. Schema and/or itemId does not exist.'));

        return resolve(memory[schema][itemId]);
    });
};

storage.fetchAll = function() {
    return new Promise((resolve, reject) => {
        if(!schema) return reject(new Error('Cannot find record. Schema required.'));
        if(!memory[schema]) return reject(new Error('404, Cannot find record. No records match schema.'));

        let ids = Object.keys(memory[schema]).map(note => note._id);

        return resolve(ids);

    });
};

storage.update = function() {
    return new Promise((resolve, reject) => {
        if(!schema || !itemId) return reject(new Error('Cannot find record. Schema and itemId required.'));
        if(!memory[schema] || !memory[schema][item._id]) return reject(new Error('404, Cannot find record. Schema and/or itemId does not exist.'));

        memory[schema][item._id] = item;
        return resolve(item);
    });
};

storage.delete = function() {
    return new Promise((resolve, reject) => {
        if(!schema || !itemId) return reject(new Error('Cannot find record. Schema and itemId required.'));
        if(!memory[schema] || !memory[schema][itemId]) return reject(new Error('404, Cannot find record. Schema and/or itemId does not exist.'));

        delete memory[schema][itemId];
        return resolve();
    });
};
