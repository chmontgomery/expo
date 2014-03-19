(function () {
  'use strict';

  var module = angular.module('HomeCare.controllers', []);

  module.controller('HomeCtrl', ['$scope', '$q',
    'patientService', 'scheduleService',
    function ($scope, $q, patientService, scheduleService) {

      /**
       * extracted into function so calculation is done
       * only on demand so it's not done on every $digest
       */
      function recombineAllData() {
        var combined = _.cloneDeep($scope.patients);
        _.each($scope.schedule, function(s) {
          var patient = _.find(combined, function(p) {
            return p.id === s.patientId;
          });
          if (patient) {
            var med = _.find(patient.meds, function(m) {
              return m.id === s.medId;
            });
            if (med) {
              med.schedule = med.schedule || [];
              med.schedule.push(s);
            }
          }
        });
        $scope.allPatients = combined;
      }

      $scope.dates = [];

      for (var i = 0; i < 24; i++) {
        $scope.dates.push({
          hour: i
        });
      }

      $scope.day = moment(); // default to today

      $scope.momentForDisplay = function (m) {
        return m.format('MM/DD/YYYY');
      };

      $scope.patients = [];

      patientService.getPatients().then(function (data) {
        $scope.patients = data.patients;
        recombineAllData();
      });

      $scope.schedule = [];

      scheduleService.getSchedule().then(function (data) {
        $scope.schedule = data.schedule;
        recombineAllData();
      });

      $scope.allPatients = [];

      $scope.editMedTime = function (medId, date, hour) {
        console.log(medId, date, hour);
      };
    }]);

  module.controller('NavbarCtrl', ['$scope',
    function ($scope) {
    }]);

})();