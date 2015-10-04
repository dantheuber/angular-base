'use strict';

module.exports = ConfigService;
ConfigService.$inject = ['$http', '$q'];

function ConfigService($http, $q) {
  var deferredConfig = $q.defer();
  $http.get('/someapiurl')
       .success(function(data){
         deferredConfig.resolve(data);
       })
       .error(function(err){
         deferredConfig.reject(err);
       });

  this.get = function() {
    // remove this when you have a working config api
    deferredConfig.resolve({
      message: 'Some Message'
    });
    return deferredConfig.promise;
  };
}
