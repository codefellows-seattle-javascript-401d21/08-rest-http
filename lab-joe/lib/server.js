'use strict'

//dependencies
const http = require('http')
const Router = require('./router')



// initialize a router instance
const router = new Router()
require('../route/route-note')(router)


// set up the application
const app = http.createServer(router.route())

// things that control the server
const server = module.exports = {}
server.start = (port, cb) => app.listen(port, cb)
server.stop = (cb) => app.close(cb)