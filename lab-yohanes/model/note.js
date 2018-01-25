'use strict';

const uuid = require('uuid/v4') //url path i think
const debug = require('debug')('http:note-constructor')

model.exports = function(title, content) { //creating module object constructor
  this.title = title
  this.content = content
  this._id = uuid()
  debug(`Created a note: ${this}`)
}