(function() {
  'use strict';

  var module = angular.module('HomeCare.controllers', []);

  module.controller('HomeCtrl', ['$scope',
    function ($scope) {
      $scope.dates = [];

      for (var i = 0; i < 24; i++) {
        $scope.dates.push({
          hour: i
        });
      }

      $scope.days = [{
        date: '3/16/14'
      },{
        date: '3/17/14'
      },{
        date: '3/18/14'
      }];

      $scope.meds = [{
        id: '1',
        name: 'Imetrix'
      },{
        id: '2',
        name: 'Zimotriptan'
      },{
        id: '3',
        name: 'Blaboblop'
      }];

      $scope.editMedTime = function(medId, date, hour) {
        console.log(medId,date,hour);

      };
    }]);

  module.controller('NavbarCtrl', ['$scope', '$location',
    function($scope, $location) {
      $scope.changeView = function(view){
        $location.path(view);
      };
    }]);

})();