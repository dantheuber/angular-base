'use strict';

require('angular');
require('angular-route');
require('angular-material');
require('angular-query-string');
require('angular-sanitize');

var app = require('angular').module('baseAngularApp', ['ngRoute', 'ngMaterial', 'angular-query-string', 'ngSanitize']);

require('./lib/js/init')();
require('./lib/js/routes')();
require('./lib/js/controllers/index')();
require('./lib/js/directives/index')();
require('./lib/js/filters/index')();
require('./lib/js/services/index')();
