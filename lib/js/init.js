'use strict';

module.exports = init;

function init(app){
  var configUrl = 'someurl';
  var initInjector = require('angular').injector(['ng','baseAngularApp']);
  var $http = initInjector.get('$http');
  var $window = initInjector.get('$window');

  fetchData();

  function fetchData() {
    $http.get(configUrl)
      .success(initSuccess)
      .error(initError);
  }

  function bootstrapApp() {
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['baseAngularApp'], {strictDi: true});
    });
  }

  function initSuccess(response) {
    app.constant('globalConfig', response);
    bootstrapApp();
  }

  function initError(errorMessage, errorStatus) {
    if(errorStatus === 401) {
      // not authorized, do some auth stuff!
    }
  }

}
