# Lab 08: REST API



A Basic HTTP api server created using the native NodeJS http module with the implementation of a custom body-parser, ul-parser and request router.  The api handles basic CRUD requests of GET, PUT, POST, and DELETE.  All operations are served on the same route, '/api/v1/note'.  The user can create and manage a simple note with two content fields, subject and comment, with an additional id field aded on the server side. 



>## Install
    
The project has the following dependencies:

```JSON

  "devDependencies": {
    "debug": "^3.1.0",
    "dotenv": "^4.0.0",
    "eslint": "^4.16.0",
    "jest": "^22.1.4",
    "superagent": "^3.8.2"
  },
  "dependencies": {
    "uuid": "^3.2.1"
  }

```

Rnn npm to install the node modules.

```bash
npm i 
```

The following npm scripts are available:

```JSON

"scripts": {
    "test": "jest",
    "test:debug": "DEBUG=http* jest --verbose i",
    "lint": "eslint .",
    "start:watch": "nodemon index.js",
    "start:debug": "DEBUG=http* nodemon index.js"
  }

```

### Run the tests!

 - Normal mode with Jest

```bash
    npm test
```

- Debug mode with Jest 

```bash
    npm run test:debug
```

>## Usage

There is one route, '/api/v1/note', with fours methods:

- GET

  - Use a query string to indicate the id of the note to retieive.  '?id=<uuid>' 
  
  - Responds with a status code of 200 and the note in JSON format on success.

  - Returns a status of 400 if the resource could not be found.

  ```
    GET:    /api/v1/note?id=8e925154-bf12-4014-b0b3-b029ab360fcf
  ```

- POST

  - Create one note by sending JSON data to the route:

  ` ```
    POST:   /api/v1/note
  ```

  ```JSON
    {
       "Subject": "Hello",
       "Comment": "Wouldn't it be nice if..."
    }
  ```

  - Responds with a status code of 201 upon success.

  - Responds with a status code of 400 for malformed data.

- PUT

  - Update a note with with any new combination of subject and comment as teh body as JSON and supplying an id in the query string, '?id=<uuid>' 

   ```
    PUT:    /api/v1/note?id=8e925154-bf12-4014-b0b3-b029ab360fcf
  ```

  ```JSON
    {
       "Subject": "GoodBye",
    }
  ```

  ```JSON
    {
       "Comment": "Looking good today Miss MacGillicuddy",
    }
  ```

  - Responds with a 204 status code upon success.

  - Responds with a status code of 400 if the note with the given id does not exist. 

- DELETE

  - Delete a note by supplying an id in the query string, '?id=<uuid>' 

   ```
    DELETE:    /api/v1/note?id=8e925154-bf12-4014-b0b3-b029ab360fcf
  ```

  - Returns a status code of 204 upon success

  - Returns a status code of 400 if the note for the id was not available.


>## Tests

  ### Valid requests

  #### POST

  - Test to validate the creation of new note

  - Test to validate receiving a 201 status code.

  - Test to validate that there is an id in the response body

  #### GET

  - Test to validate receiving a 200 status code.

  - Test to validate the item returned with the id that was requested

  - Test to validate the id was a correctly formed uuid

  - Test to validate a status of 200'
  
  - Test to validate the return an array
  
  - Test to validate the return of an array of all the ids


  #### PUT

  - Test to validate a status cone of 204

  - Test to validate the note now has the values from the put request

  - Test to validate the note now has different values form the original post data

  - Test to validate the note has the same id as the original item created by post 

  #### DELETE

  - Test to validate a 204 status

  - Test to validate the response should not have data in the body
  
  - Test to validate that the note has been deleted


### Inalid requests

  #### GET
     
   - Validate a 404 error when sending a request to the wrong route
    
  #### POST
     
   - Validate a 404 error when sending a request to the wrong route
  
  #### PUT
     
   - Validate a 404 error when sending a request to the wrong route
   
   #### DELETE
     
   - Validate a 404 error when sending a request to the wrong route
  
