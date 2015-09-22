'use strict';

module.exports = MainController;
MainController.$inject = ['$scope','ConfigService'];

function MainController($scope, ConfigService) {
  $scope.message = '';
  ConfigService.get()
    .then(function(data){
      $scope.message = 'Got Data!';
    })
    .catch(function(err){
      $scope.message = 'Failed to get config!';
    });
}
