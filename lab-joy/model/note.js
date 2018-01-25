'use strict';

const uuid = require('uuid/v4');
const debug = require('debug')('http:note-constructor'); //

module.exports = function(title, content, id) {
    this.title = title;
    this.content = content;
    this.id = id || null;
    this._id = uuid();
    debug(`Created a note: ${this}`);
};