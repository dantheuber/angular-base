'use strict';

module.exports = ConfigService;
ConfigService.$inject = ['$http', '$q'];

function ConfigService($http, $q) {
  var deferredConfig = $q.defer();
  $http.get('someapiurl')
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
