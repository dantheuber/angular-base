'use strict';

require('angular');
require('angular-route');
require('angular-query-string');
require('ngSmoothScroll');
require('angular-sanitize');

var app = require('angular').module('baseAngularApp', ['ngRoute', 'angular-query-string', 'ngSanitize']);

require('./lib/js/init')(app);
require('./lib/js/routes')();
require('./lib/js/controllers/index')();
require('./lib/js/directives/index')();
require('./lib/js/filters/index')();
require('./lib/js/services/index')();
