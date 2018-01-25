# 08 REST HTTP

This is a note application that creates endpoints for `GET`, `POST`, `PUT`, and `DELETE` when a note is either written, recalled, updated, or deleted. 

## Data Structures

This application does not rely on `npm` packages in order to create endpoints like `express.js`. Here are the endpoints created:

`POST` - takes date through the `url-parser` and the `body-parser`, then into the `route-note` module which sends the note that was created to the `storage` module where it is stored in memory.

`GET` - similar route as `POST`, but instead of storing a note to memory, it returns all notes that have been stored in memory.

`PUT` - aslo similar to `POST`, but looks for a specific id of a note and reassigns it in memory.

`DELETE` - also requires a specific id, locates it in memory and deletes it.
