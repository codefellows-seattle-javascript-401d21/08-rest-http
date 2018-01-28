'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');

module.exports = function(subject, comment) {
  this.subject = subject;
  this.comment = comment;
  this.id = uuid();
  debug(`#Note: ${this}`);
};