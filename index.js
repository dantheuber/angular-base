'use strict';

require('angular');
require('angular-route');
require('angular-material');
require('angular-query-string');
require('angular-sanitize');

var app = require('angular').module('baseAngularApp', ['ngRoute', 'ngMaterial', 'angular-query-string', 'ngSanitize']);

require('./lib/js/init')(app);
require('./lib/js/routes')(app);
require('./lib/js/controllers/index')(app);
require('./lib/js/directives/index')(app);
require('./lib/js/filters/index')(app);
require('./lib/js/services/index')(app);
