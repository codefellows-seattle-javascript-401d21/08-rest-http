Lab 08 - Jan 25 2018


The purpose of this lab was to get acquainted with the underbelly of a library like express.js

I was able to create routes for different rest methods, with functions attached to them to update an object that represents a memory database.


POST storage.put()

GET storage.fetchOne()

PUT storage.update()

DELETE storage.delete()

Dependencies:

  "dependencies": {
    "debug": "^3.1.0",
    "dotenv": "^4.0.0",
    "eslint": "^4.16.0",
    "superagent": "^3.8.2"
  }


to run, make sure nodemon is installed globally.

Run nodemon, 

Test the apis different methods with a program like Postman.

for example:

test a 'GET' request in postman with : http://localhost:3000/api/v1/note?note=third,

this should retrieve the third item in the memory.

