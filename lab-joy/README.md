# 08 - Vanilla REST API
Joy Hou, Jan 24, 2018

# Modules
## Server
Creates an HTTP server using native NodeJS http module.

## Body-Parser
Custom body parser module that uses promises to parse the JSON body of POST and PUT requests.

## Url-Parser
Custom URL parser that returns a promise and uses NodeJS url and querystring modules to parse the request url.

## Router
Handles GET, POST, PUT, and DELETE requests to the server.

## Storage
Stores resources by their schema type and ID.

## Note
Object constructor that stores instances of Notes, which has properties of an ID, title, and content.

## Route-Note
Handles API requests.