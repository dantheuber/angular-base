'use strict';

module.exports = function() {
  var app = require('angular').module('baseAngularApp');

  routes.$inject = ['$routeProvider'];

  function routes($routeProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: 'templates/_main.html'
      })
      .otherwise({
        redirectTo: '/index'
      });
  }

  app.config(routes);
};
