'use strict';

const uuid = require('uuid');
const debug = require('debug')('http:note-constructor');

module.exports = function(title, content) {
    debug(`Created a note: ${this}`);
    this.title = title;
    this.content = content;
    this._id = uuid();
    debug(`Created a note: ${this}`);
};