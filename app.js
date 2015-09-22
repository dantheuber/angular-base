'use strict';
var nodeStatic = require('node-static');
var server = new nodeStatic.Server('./dist');
var http = require('http');

http.createServer(function (request, response) {
  server.serve(request, response);
}).listen(5003);
