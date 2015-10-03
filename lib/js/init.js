'use strict';

module.exports = init;

function init(app){
  var angular = require('angular');
  var configUrl = 'someapiurl';
  var initInjector = require('angular').injector(['ng','baseAngularApp']);
  var $http = initInjector.get('$http');
  var $window = initInjector.get('$window');
  var LogService = initInjector.get('LogService');

  fetchData();
  // initSuccess({some:'data'});

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
    LogService.error({
      some: 'error message to your logging service',
      other: {
        errorMessage: errorMessage,
        errorStatus: errorStatus
      }
    });
  }

}
