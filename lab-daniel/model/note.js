'use strict';

// Module Dependencies
const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');

// Note Constructor
module.exports = function (title, content) {
  if (!title || !content) return new Error('Notes require a Title and Content');
  this.title = title;
  this.content = content;
  this._id = uuid();
  debug(`Created a note: ${this}`);
};