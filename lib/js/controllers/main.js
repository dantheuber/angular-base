'use strict';

module.exports = MainController;
MainController.$inject = ['$scope','ConfigService'];

function MainController($scope, ConfigService) {
  $scope.location = '';
  $scope.message = '';
  ConfigService.get()
    .then(function(data){
      // example app uses open weather api for example data
      $scope.location = data.name;
      $scope.message = data.weather[0].description;
    })
    .catch(function(err){
      $scope.location = 'ERROR';
      $scope.message = err;
    });
}
