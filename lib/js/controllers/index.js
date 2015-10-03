'use strict';

module.exports = function(){
  var app = require('angular').module('baseAngularApp');
  
  app.controller('MainController', require('./main'));
};
