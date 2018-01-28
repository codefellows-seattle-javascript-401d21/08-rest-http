'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor');


module.exports = function(title, content){

  if(!title){
    throw new Error('Cannot post: Title required.');
  }
  if(!content){
    throw new Error('Cannot post: Content required.');
  }

  this.title = title;
  this.content = content;
  this._id = uuid();

  debug(`Created a note: Title: ${this.title}, Content: ${this.content}, ID: ${this._id}`);
};
