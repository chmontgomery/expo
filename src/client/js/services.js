(function () {
  'use strict';

  /**
   * @param $q
   * @param $http
   * @param url
   * @returns {promise}
   */
  function getRequest($q, $http, url) {
    var deferred = $q.defer();
    $http({method: 'GET', url: url}).
      success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function (data, status, headers, config) {
        deferred.reject(data);
      });
    return deferred.promise;
  }

  angular.module('HomeCare.services', [])
    .factory('patientService', ['$q', '$http', function ($q, $http) {
      return {
        getPatients: function () {
          return getRequest($q, $http, '/patients');
        },
        getPatient: function (id) {
          return getRequest($q, $http, '/patients/'+id);
        }
      };
    }])
    .factory('scheduleService', ['$q', '$http', function ($q, $http) {
      return {
        getSchedules: function () {
          return getRequest($q, $http, '/schedules');
        },
        getSchedule: function (id) {
          return getRequest($q, $http, '/schedules/'+id);
        }
      };
    }])
    .factory('medicationService', ['$q', '$http', function ($q, $http) {
      return {
        getMedications: function () {
          return getRequest($q, $http, '/medications');
        },
        getMedication: function (id) {
          return getRequest($q, $http, '/medications/'+id);
        }
      };
    }]);
})();
