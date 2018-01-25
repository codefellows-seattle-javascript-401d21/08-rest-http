'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');

module.exports = function(title, content) {
  this.title = title || 'untitled';
  this.content = content || '';
  this._id = uuid();
  debug(`created a note: ${JSON.stringify(this)}`);
};
