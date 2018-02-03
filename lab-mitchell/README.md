# Lab 8 ~ Vanilla REST API

**Author**: Mitchell
**Version**: 1.0.0

## Overview
We were tasked to create a simple HTTP server using the NodeJS `http` module. It was to contain a custom body-parser module, url-parser module, router constructor to handle `GET`, `POST`, `PUT`, and `DELETE` requests, and a storage module that serves to store resources by schema type (e.g. notes) and a unique id. 

## Getting Started
To get this application up and running, fork and/or clone this repository using the `git clone <git repository link>` command in your terminal. Next, run the `npm install` command, which will install all the necessary dependencies in the accompanying package.json file. After those packages have installed, you can run `npm test` to explore the included tests and functionality of their respective solutions. You can open up the code in your favorite editor to explore/modify the code, see how the tests are structured, and create tests of your own if desired.

## Description
The focus of this application is pretty well outlined in the overview above. Contained in the model/ directory is an exported note constructor, which expects a title and content as its arguments for each note. It uses the `uuid` NPM package to generate a unique user ID for each note as well.

The body-parser and url-parser modules each expect a single request argument, and output parsed JSON for use in other parts of the application.

The router module exports an anonymous function that holds the multiple request types as prototype methods on the Router instance.

The server module is utilized to create new Router instances from the router module that are passed as arguments to the `http.createServer()` method.

The storage module is home to CRUD operations, and contains the methods `.create()`, `.fetchOne()`, `.fetchAll()`, `.update()`, and `.delete()`.

The route-note module exports a function that handles the requests from the router module in relation to the storage of notes themselves.

## Credits and Collaborations
[Jest Docs](https://facebook.github.io/jest/) ~ https://facebook.github.io/jest/
[Dotenv NPM Docs](https://www.npmjs.com/package/dotenv) ~ https://www.npmjs.com/package/dotenv
[HTTP NodeJS Module Docs](https://nodejs.org/api/http.html) ~ https://nodejs.org/api/http.html
[UUID NPM Package Docs](https://www.npmjs.com/package/uuid) ~ https://www.npmjs.com/package/uuid