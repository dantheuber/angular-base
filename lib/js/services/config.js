'use strict';

module.exports = ConfigService;
ConfigService.$inject = ['$http', '$q'];

function ConfigService($http, $q) {
  var deferredConfig = $q.defer();
  $http.get('http://catfacts-api.appspot.com/api/facts')
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
