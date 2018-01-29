# General information
_Author_: Jeremy Pearson

_Version_: 1.0.0

_Libraries_: jest, debug, dotenv, eslint, superagent, uuid

_Last modified_: 1/24/2018

# Function use

## Example
[output] = function([inputs])

_Brief description_

## Challenge functions

[NO RETURN FROM SERVER] = storage.delete(schema, itemID)
[NO RETURN FROM SERVER] = storage.update(schema, item)
[RETURNS ITEM OBJECT] = storage.create(schema, item)
[RETURNS ITEM OBJECT] = storage.fetchOne(schema, itemID)
[RETURNS ALL ITEM OBJECTS] = storage.fetchAll(schema)
