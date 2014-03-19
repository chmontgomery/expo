(function () {
  'use strict';

  var module = angular.module('HomeCare.controllers', []);

  module.controller('HomeCtrl', ['$scope', '$q',
    'patientService', 'scheduleService',
    function ($scope, $q, patientService, scheduleService) {
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

      function resolveAllData() {
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

      $scope.patients = [];

      patientService.getPatients().then(function (data) {
        $scope.patients = data.patients;
        resolveAllData();
      });

      $scope.schedule = [];

      scheduleService.getSchedule().then(function (data) {
        $scope.schedule = data.schedule;
        resolveAllData();
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