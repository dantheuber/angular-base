'use strict';
var packageJson = require('packageJson');

module.exports = LogService;
LogService.$inject = ['$http', '$log'];

function LogService($http, $log){
  this.info = function(data) {
    return sendLogData('info', data);
  };

  this.warn = function(data) {
    return sendLogData('warn', data);
  };

  this.error = function(data) {
    return sendLogData('error', data);
  };

  this.fatal = function(data) {
    return sendLogData('fatal', data);
  };

  this.debug = function(data) {
    return sendLogData('debug', data);
  };

  this.trace = function(data) {
    return sendLogData('trace', data);
  };

  var sendLogData = function(level, data) {
    var request = {
      method: 'POST',
      url: '/somelogapiurl',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name: packageJson.name,
        version: packageJson.version,
        level: level
      }
    };

    // Combine custom provided oject with post data.
    require('angular').merge(request.data, data);

    // Send request to API. Log in console only if logging fails.
    $http(request)
      .error(function(error){
        $log.error('Error communicating with logging api ',error);
        $log.error('Application Error: ', request.data);
      });
    return;
  };
}
