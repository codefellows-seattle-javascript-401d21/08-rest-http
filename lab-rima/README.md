## Vanilla REST API

### `/api/v1/note`
* `POST` request

Valid input:
  * pass data as stringified JSON in the body of a **POST** request to create a new note
  * this should return a 201 status code with the new record content

Invalid input:
  * If no schema and/or no title and/or no content is/are sent, it rejects and throws an error

* `GET` request

* fetch one specified by id
Valid input:
  * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
  * this should return a 200 status code with the requested record

Invalid input:
  * If no schema and/or no id is/are sent, it rejects and throws an error
  * If no item exists, it rejects and throws an error

* fetch all specified by id
Valid input:
  * retrieve all resource (as JSON)
  * this should return a 200 status code with the requested record

Invalid input:
  * If no schema is sent, it rejects and throws an error
  * If no schema exists, it rejects and throws an error

* `PUT` request

Valid input:
  * pass `?id=<uuid>` as a query string parameter, with a body of data to update a specific resource (as JSON)
  * this should return a 204 status code with no content in the body

Invalid input:
  * If no schema and/or no id is/are sent, it rejects and throws an error
  * If no item exists, it rejects and throws an error

* `DELETE` request

* delete one specified by id
Valid input:
  * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
  * this should return a 204 status code with no content in the body

Invalid input:
  * If no schema and/or no id is/are sent, it rejects and throws an error
  * If no item exists, it rejects and throws an error

* delete all specified by id
Valid input:
  * delete all resource (as JSON)
  * this should return a 200 status code with the requested record

Invalid input:
  * If no schema is sent, it rejects and throws an error
  * If no schema exists, it rejects and throws an error
