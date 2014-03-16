(function() {
  'use strict';

  var module = angular.module('HomeCare.directives', []);

  module.directive('navbar', function() {
    return {
      restrict: "E",
      replace: true,
      controller: 'NavbarCtrl',
      templateUrl: 'partials/navbar.html'
    };
  });

  module.directive('home', function() {
    return {
      restrict: "E",
      replace: true,
      controller: 'HomeCtrl',
      templateUrl: 'partials/home.html'
    };
  });

})();