'use strict';

module.exports = ConfigService;
ConfigService.$inject = ['$http', '$q'];

function ConfigService($http, $q) {
  var deferredConfig = $q.defer();
  $http.get('http://google.com/')
       .success(function(data){
         deferredConfig.resolve(data);
       })
       .error(function(err){
         deferredConfig.reject(err);
       });

  this.get = function() {
    // get config and return it
    // temporary
    deferredConfig.resolve({some: 'data'});
    return deferredConfig.promise;
  };
}
