'use strict';

module.exports = function() {
  var app = require('angular').module('baseAngularApp');

  routes.$inject = ['$routeProvider'];

  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/_main.html'
      })
      // You will probably want to remove this route
      // it is used for config service to return some dummy data
      .when('/someapiurl', {
        resolve: {
          title: 'Base Angular Project'
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  app.config(routes);
};
