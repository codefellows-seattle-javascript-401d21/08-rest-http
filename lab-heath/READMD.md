
# LAB 08: Vanilla REST API

### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install` and httpie(done with home) after that you need to install uuid `npm install uuid` and then you need to install the dev dependencies jest, superagent, dotenv, debug `npm install -D jest superagent dotenv debug`. 


next you need to have these scripts adjusted in your package.json file.

```javascript
"scripts": {
    "test": "jest",
    "lint": "eslint",
    "start": "node index.js",
    "start:watch": "nodemon index.js",
    "start:debug": "DEBUG=http* nodemon index.js",
  },
  ```

from there, you can go to your terminal and type, 

```javascript
node run start
```
and this will start up your server, if you do `npn run start:watch`, this will let you see it in your localhost in your browser.


### some helpful commands  

these are you basic commands 

to add note to it.
```javascript
http POST http://localhost:3000/api/v1/note title={your title} content=[what you want]
```

this should return this 

```javascript
{
    "_id": "75dce3d4-1304-4f29-b519-6d45f3b681cb",
    "content": "stuff",
    "title": "heath"
}
```


to get all your notes.
```javascript
http GET http://localhost:3000/api/v1/note
```
it will get all the notes that in memory and it should look like this.

```javascript
{
    "75dce3d4-1304-4f29-b519-6d45f3b681cb": {
        "_id": "75dce3d4-1304-4f29-b519-6d45f3b681cb",
        "content": "stuff",
        "title": "heath"
    }
}
```

to update a note.
```javascript
http PUT http://localhost:3000/api/v1/note title=heath content=thisisatestoftheupdate id=eb96fe8d-106d-4d2e-ae04-4696116e7d15
```

now your note should look like this

```javascript
{
    "75dce3d4-1304-4f29-b519-6d45f3b681cb": {
        "_id": "75dce3d4-1304-4f29-b519-6d45f3b681cb",
        "content": "wasrunning",
        "title": "cat"
    }
}
```

to delete a note.
```javascript
http DELETE http://localhost:3000/api/v1/note id=cdb0a4b1-bb1a-4150-beb1-7cc8f1c7a9ba
```  
and now you should have nothing is you do the GET command again.

### function code for the POST

```javascript
router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(storedNote => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
  ```
  for the storage side

  ```javascript
  storage.create = function(schema, item) {
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item; 
    return resolve(item);
  });
};
```

### function code for the GET

```javascript
router.get('/api/v1/note', (req, res) => {
    debug('GET /api/v1/note');

    try {
      storage.fetchAll('Note')
        .then(storedNote => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
          debug('set back');
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }   
  });
  ```
  for the storage side

  ```javascript
storage.fetchAll = function(schema) {
  debug('getting all the things!');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot get any items from the memory')); 

    return resolve(memory[schema]);
  });
};
```

### function code for the PUT

```javascript
router.put('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');
    try {
      let newNote = new Note(req.body.title, req.body.content);
      newNote._id = req.body.id;
      storage.update('Note', newNote)
        .then(storedNote => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
  ```
  for the storage side

  ```javascript
storage.update = function(schema, item) {
  debug('updating that item!');
  return new Promise((resolve, reject) => {
    if(!item) return reject(new Error('Cannot update this item')); 

    memory[schema][item._id] = item; 
    return resolve(item);
  });
};
```

### function code for the DELETE

```javascript
router.delete('/api/v1/note', (req, res) => {
    debug('DELETE /api/v1/note');
    debug('inside');
    try {
      storage.delete('Note', req)
        .then(item => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(item));
          res.end();
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
    }
  });
  ```
  for the storage side

  ```javascript
storage.delete = function(schema, item) {
  debug('Deleting a thing');
  debug('this is the id',item.body.id);
  return new Promise((resolve, reject) => {
    debug('test', memory[schema]);
    if(!schema || !item) return reject(new Error('Cannot delete item, item not found'))
    delete memory[schema][item.body.id];
    return resolve(memory[schema]);
  });
};
```

### testing 

testings was done with superagent to make the calls for us and the test code looks like this

### test block 1.
these test checks to see if the POST is working

it #1 checks the status code for invalid
it #2 checks the status code for valid
it #3 checks to see if text to be sent to us is matching


```javascript
 //POST
  describe('POST', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.post(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 201 with valid input', () => {
      return superagent.post(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it('Should respond with a single note', () => {
      return superagent.post(`:4000/api/v1/note`)
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.body.content).toBe('pizza');
        });
    });
  });
```

### test block 2.
these test checks to see if the GET is working

it #1 checks the status code for invalid
it #2 checks the status code for valid
it #3 checks to see if something is sent to the front

```javascript
   describe('GET', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.get(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 200 with valid input', () => {
      return superagent.get(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it('Should respond with all notes', () => {
      return superagent.get(':4000/api/v1/note')
        .then(res => {
          expect(JSON.parse(res.text));
        });
    });
  });
```

### test block 3.
these test checks to see if the PUT is working

it #1 checks the status code for invalid
it #2 checks the status code for valid
it #3 checks to see if you put in the write info to send to for the update

```javascript
   describe('PUT', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.put(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 204 with valid input', () => {
      return superagent.put(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
    it('Should respond a bad request response if invalid query text is sent', () => {
      return superagent.get(':4000/api/v1/note id=')
        .catch(err => {
          expect(err.response.text).toBe('Not Found');
        });
    });
  });
```

### test block 4.
these test checks to see if the DELETE is working

it #1 checks the status code for invalid
it #2 checks the status code for valid

```javascript
 describe('DELETE', () => {
    it('should return a status 400 with invalid input', () => {
      return superagent.delete(':4000/api/v1/note')
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
    it('should respond with a status 204 with valid input', () => {
      return superagent.delete(':4000/api/v1/note')
        .send({text: 'test', content: 'pizza'})
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
  });
```

help they is helpful

