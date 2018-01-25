'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor'); 

//if new Note(undefined, undefined) => {title: undefined, content: 'No content'};
//if line 14 is this.content = content || 'No Content'
// && module.exports = function(title, content='No Content')
module.exports = function(title, content) {
  if(!title) return new Error('title requried to create new note'); //validates note title exists
  if(!content) return new Error('content required to create new note'); //validates note content exists

  this.title = title; //sets this's title to the passed title parameter
  this.content = content; //sets this's content to the passed content parameter
  this._id = uuid(); //sets this's _id to a unique user id from the imported module
  debug(`Created a note: ${this}`);
};