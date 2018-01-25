'use strict';

const debug = require('debug')('http:storage');
const storage = module.exports = {};
const memory = {};

// memory = {
//   'Notes': {
//     '1234.5678.9012': {
//       '_id': '1234.5678.9012',
//       'title': '',
//       'content': '',
//     },
//   },
//   'Categories': {
//     ...
//   },
// }

storage.create = function (schema, item) {
    debug('Created a new thing');
    return new Promise((resolve, reject) => {
        if (!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));
        if (!memory[schema]) memory[schema] = {};
        memory[schema][item._id] = item;
        return resolve(memory[schema][item._id]);
    });
};

storage.fetchOne = function (schema, _id) {
    debug(`Fetched note ${_id}`);
    return new Promise((resolve, reject) => {
        if (!schema || !_id) return reject(new Error('Invalid get request.'));
        return resolve(memory[schema][_id]);
    });
};

storage.fetchAll = function (schema) {
    debug('Fetched all notes');
    return new Promise((resolve, reject) => {
        if (!schema) return reject(new Error('No notes available for this schema.'));
        return resolve(memory[schema]);
    });
};

storage.update = function (schema, item) {
    debug('Upated item');
    return new Promise((resolve, reject) => {
        if (!schema || !item) return reject(new Error('No item to update.'));
        return resolve(memory[schema][item._id]);
    });
};

storage.delete = function (schema, item) {
    debug('Deleted item');
    return new Promise((resolve, reject) => {
        if (!schema || !item) return reject(new Error('No item to delete.'));
        return resolve(memory[schema][item.id]);
    });
};