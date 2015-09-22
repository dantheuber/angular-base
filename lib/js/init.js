'use strict';

module.exports = init;

function init(app){
  var configUrl = 'http://google.com';
  var initInjector = require('angular').injector(['ng','baseAngularApp']);
  var $http = initInjector.get('$http');
  var $window = initInjector.get('$window');

  // fetchData();
  initSuccess({some:'data'});

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
