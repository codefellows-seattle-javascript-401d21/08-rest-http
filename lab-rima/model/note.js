'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');


module.exports = function(title, content){

  if(!title || !content){
    throw new Error('Cannot post: Title and content required.');
  }

  this.title = title;
  this.content = content;
  this._id = uuid();

  debug(`Created a note: Title: ${this.title}, Content: ${this.content}, ID: ${this._id}`);
};
