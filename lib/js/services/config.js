'use strict';

module.exports = ConfigService;
ConfigService.$inject = ['$http', '$q'];

function ConfigService($http, $q) {
  var deferredConfig = $q.defer();
  // example app uses open weather api for example data
  $http.get('http://api.openweathermap.org/data/2.5/weather?q=Budapest')
       .success(function(data){
         deferredConfig.resolve(data);
       })
       .error(function(err){
         deferredConfig.reject(err);
       });

  this.get = function() {
    return deferredConfig.promise;
  };
}
