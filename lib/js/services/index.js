'use strict';

module.exports = function() {
  var app = require('angular').module('baseAngularApp');

  app.service('ConfigService', require('./config'));
  app.service('LogService', require('./log'));
};
