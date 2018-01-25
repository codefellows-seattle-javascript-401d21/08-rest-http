#Feature Task
create the following directories to organize your code:
lib
model
test
create an HTTP server using the native NodeJS http module
create an object constructor that creates a simple resource with at least 3 properties
include an id property that is set to a unique id (hint: you'll need to use uuid)
include two additional properties of your choice (ex: name, content, etc.)
create a custom body parser module that uses promises to parse the JSON body of POST and PUT requests
create a custom url parser module that returns a promise and uses the NodeJS url and querystring modules to parse the request url
create a router constructor that handles requests to GET, POST, PUT, and DELETE requests
create a storage module that will store resources by their schema type (ex: note) and id

#Server Endpoints
/api/v1/notes
POST request
pass data as stringified JSON in the body of a POST request to create a new resource
this should return a 201 status code with the new record content
GET request
pass ?id=<uuid> as a query string parameter to retrieve a specific resource (as JSON)
this should return a 200 status code with the requested record
PUT request
pass ?id=<uuid> as a query string parameter, with a body of data to update a specific resource (as JSON)
this should return a 204 status code with no content in the body
DELETE request
pass ?id=<uuid> in the query string to DELETE a specific resource
this should return a 204 status code with no content in the body

#Tests
write tests to ensure the /api/v1/simple-resource-name endpoint responds as described for each condition below:
GET: test 400, it should respond with 'bad request' if no id was provided in the request
GET: test 200, it should contain a response body for a request made with a valid id
POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
POST: test 200, it should respond with the body content for a post request with a valid body
PUT: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
PUT: test 200, it should respond with the body content for a put request with a valid body
DELETE: test 400, it should respond with 'bad request' if no id was provided in the request
DELETE: test 200, it should contain a response body for a request made with a valid id