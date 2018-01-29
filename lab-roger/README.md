# Lab 08: REST HTTP Server

## Installation
To run the application for the first time user should  
    `npm i`   
    `npm start`  
To user can then access the server via a browser or CLI like HTTpie.

Connect to localhost:3000, and requests can be make.

Following HTTP requests can be made  
`http POST http://localhost:3000/api/v1/note title=<something> content=<somthing else> `    
`http PUT http://localhost:3000/api/v1/note?_id=<id of record> title=<new info> content=<new info>  `    
`http http://localhost:3000/api/v1/note will get all the records in an idsArray    `     
`http http://localhost:3000/api/v1/note?_id=<record id> will return one specific record  `     
`http DELETE http://localhost:3000/api/v1/note?_id=<record id> will delete that record`     



## Testing

To run the test suite the user should  

```npm test```

The test suite will run.
