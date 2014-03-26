(function () {
  'use strict';

  var module = angular.module('HomeCare.directives', []);

  module.directive('navbar', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'NavbarCtrl',
      templateUrl: 'partials/navbar.html'
    };
  });

  module.directive('leftNav', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'LeftNavCtrl',
      templateUrl: 'partials/leftNav.html'
    };
  });

  module.directive('mar', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'MarCtrl',
      templateUrl: 'partials/mar.html'
    };
  });

  module.directive('currentTime', ['$interval', function ($interval) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        function updateTime() {
          element.text(moment().format('MMMM Do YYYY, h:mm:ss a'));
        }

        $interval(updateTime);
      }
    };
  }]);

})();