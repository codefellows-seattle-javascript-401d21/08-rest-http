# REST HTTP Server

**Author**: Steve Carpenter
**Version**: 1.0.0

## Overview
This is a simple REST HTTP Server that provides the four primary HTTP methods for a simple Note:
*GET - Get Notes by passing the \_id in querystring
*PUT - Update Notes using the body to pass data
  *Data object must include \_id, title, & content
*POST - Create new Notes using the body to pass data
  *Data object must include title and content
*DELETE - Delete Notes by passing the \_id in the querystring

## Getting Started
The user needs to do the following to get the code up and running:
-Clone the repository from github [here](https://github.com/stevegcarpenter/08-rest-http)
-Run `npm install` in the lab-steve directory to install all the Node packages
-Run nodemon to start the server listening
-Utilize something like [Postman](https://www.getpostman.com/) or HTTPie to make GET, PUT, POST, and DELETE requests
  -Make certain they match the format described above

## Architecture
-NodeJS
-npm
-uuid
-urlparser
-querystring
-JS

## Change Log
2018-01-24 Scaffolded out repository
2018-01-24 Got all the code from lecture up and running.
2018-01-25 Got fetchOne and fetchAll working properly.
2018-01-25 Only fetch all notes if _id wasn't provided.
2018-01-25 Added some tests for the post and get routes
2018-01-25 Added another GET test
2018-01-25 Finished writing tests
2018-01-25 Modified the error checking a bit
2018-01-25 Added the PUT and DELETE methods
2018-01-25 Finished the README.ms

## Credits and Collaborations
[NodeJS](https://nodejs.org)
[npm](https://www.npmjs.com/)
[JavaScript](https://www.javascript.com/)

