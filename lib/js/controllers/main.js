'use strict';

module.exports = MainController;
MainController.$inject = ['$scope','ConfigService'];

function MainController($scope, ConfigService) {
  $scope.message = '';
  ConfigService.get()
    .then(function(data){
      console.log(data);
      $scope.message = data.title || '';
    })
    .catch(function(err){
      $scope.message = 'Failed to get cat facts!!';
    });
}
