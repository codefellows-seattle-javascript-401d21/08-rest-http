'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');

module.exports = function(title, comment) {
  this.title = title;
  this.comment = comment;
  this.id = uuid();
  debug(`#Note: ${this}`);
};