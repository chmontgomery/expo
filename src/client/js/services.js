(function () {
  'use strict';

  angular.module('HomeCare.services', [])
    .factory('patientService', ['$q', '$http', function ($q, $http) {
      var getPatients = function () {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/patients'}).
          success(function (data, status, headers, config) {
            deferred.resolve(data);
          }).
          error(function (data, status, headers, config) {
            deferred.reject(data);
          });

        return deferred.promise;
      };

      return {
        getPatients: getPatients
      };
    }])
    .factory('scheduleService', ['$q', '$http', function ($q, $http) {
      var getSchedule = function () {
        var deferred = $q.defer();

        $http({method: 'GET', url: '/schedule'}).
          success(function (data, status, headers, config) {
            deferred.resolve(data);
          }).
          error(function (data, status, headers, config) {
            deferred.reject(data);
          });

        return deferred.promise;
      };

      return {
        getSchedule: getSchedule
      };
    }]);
})();
