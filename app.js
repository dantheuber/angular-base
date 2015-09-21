'use strict';

require('angular');
require('angular-route');
require('angular-query-string');
require('angular-sanitize');

var app = require('angular').module('baseAngularApp', ['ngRoute', 'angular-query-string', 'ngSanitize']);

require('./lib/js/init')(app);
require('./lib/js/routes')(app);
require('./lib/js/controllers')(app);
require('./lib/js/directives')(app);
require('./lib/js/filters')(app);
require('./lib/js/services')(app);
