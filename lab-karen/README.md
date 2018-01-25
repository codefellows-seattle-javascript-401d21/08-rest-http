## Lab 08-REST-HTTP
### Description
This lab creates a REST API with in-memory persistence.

### Getting started
- Fork this repo.  Install a local copy on your machine using the git clone (identifier) in the working directory.
- This application runs with NodeJS.  Ensure you have installed.
- The required packages are handled with npm (Node package manager).  Initialize the project with npm init to create a package.json.
- The application requires a package for unique user id - uuid.  Install with *npm i uuid*
- There are some developer dependancies packages - jest, estlint, debug, superagent, dotenv.  Install with the command *npm i -D jest, eslint, debug, superagent, dotenv*.
- The project requires manually creating REST command line HTTP requests.  You may use whatever method you wish to compose these requests.  Two options are Postman and HTTPie.

### How to interact with the endpoints
Once the project is properly installed and initialized, start the server by typing either *node index.js* or *nodemon index.js* in the terminal.
Use whichever tool you choose to input HTTP requests. The server endpoint is */api/v1/note*.
**POST request**
Pass data as stringified JSON in the body of a POST request to create a new resource
A return of 201 status code indicates the new record content successfully post.
**GET ALL request**
Retrieve a resource (as JSON).
A return of 200 status code indicated the data has completed.
**PUT request**
Pass ?id=<uuid> in a query string parameter, with a body of data to update a specific resource (as JSON)
A return a 204 status code indicates a successful update.
**DELETE request**
Pass ?id=<uuid> in the query string to DELETE a specific resource
A return a 204 status code with no content in the body
