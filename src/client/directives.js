(function() {
  'use strict';

  var module = angular.module('HomeCare.directives', []);

  module.controller('navbarCtrl', ['$scope', '$location',
    function($scope, $location) {
      $scope.changeView = function(view){
        $location.path(view);
      };
    }]);

  module.directive('navbar', function() {
    return {
      restrict: "E",
      replace: true,
      controller: 'navbarCtrl',
      templateUrl: 'partials/navbar.html'
    };
  });

})();