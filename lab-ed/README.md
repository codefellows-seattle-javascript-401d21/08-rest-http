# Lab 08: Rest API

This app is a REST API server that will respond to a GET, POST, DDELETE, or PUT request.

To install the app clone the git repository. To run the app using nodemon type: 'nodemon server.js' on the terminal commmand line. The only dependency for this server is UUID, to install that use this command in the server directory: NPM i uuid.

The developer dependecies are: "debug": "^3.1.0",
    dotenv, eslint, jest, superagent. To install: NPM i -D 'dependency name'.
    To get debug messages use: npm run start:debug

Use Postman or httpie to mahe a request.

Below are sample requests and responses:

http POST http://localhost:3000/api/v1/note title=hello content=world

HTTP/1.1 201 Created
Connection: keep-alive
Content-Type: application/json
Date: Thu, 25 Jan 2018 06:17:09 GMT
Transfer-Encoding: chunked

{
    "_id": "76486c16-4fe7-45fb-bf99-1d5cf0f3067a",
    "content": "world",
    "title": "hello"
}

http GET http://localhost:3000/api/v1/note 
HTTP/1.1 201 Created
Connection: keep-alive
Content-Type: application/json
Date: Thu, 25 Jan 2018 06:18:21 GMT
Transfer-Encoding: chunked

{
    "Note": {
        "394f2dfd-2865-44ba-99da-425ebdd76c85": {
            "_id": "394f2dfd-2865-44ba-99da-425ebdd76c85",
            "content": "bar",
            "title": "foo"
        },
    }
}

PUT http://localhost:3000/api/v1/note id="394f2dfd-2865-44ba-99da-425ebdd76c85" content="Rocks" title="are cool"
HTTP/1.1 201 Created
Connection: keep-alive
Content-Type: application/json
Date: Thu, 25 Jan 2018 06:20:53 GMT
Transfer-Encoding: chunked

{
    "_id": "394f2dfd-2865-44ba-99da-425ebdd76c85",
    "content": "Rocks",
    "title": "are cool"
}

http DELETE http://localhost:3000/api/v1/note id="394f2dfd-2865-44ba-99da-425ebdd76c85"
HTTP/1.1 201 Created
Connection: keep-alive
Content-Type: application/json
Date: Thu, 25 Jan 2018 06:19:28 GMT
Transfer-Encoding: chunked
