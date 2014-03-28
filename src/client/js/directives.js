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

  module.directive('home', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'HomeCtrl',
      templateUrl: 'partials/home.html'
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

  module.directive('demographics', function () {
    return {
      restrict: "E",
      replace: true,
      controller: 'DemographicsCtrl',
      templateUrl: 'partials/demographics.html'
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

  module.directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter, {'event': event});
          });

          event.preventDefault();
        }
      });
    };
  });

})();