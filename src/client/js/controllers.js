(function () {
  'use strict';

  var module = angular.module('HomeCare.controllers', [
    'HomeCare.services'
  ]);

  module.controller('HomeCtrl', ['$scope', 'patientService', '$timeout',
    function ($scope, patientService, $timeout) {
      $scope.searchText = '';
      $scope.patients = [];
      $scope.searchCalled = false;
      $scope.searchCallInProgress = false;
      $scope.getPatients = function () {
        $scope.searchCalled = true;
        $scope.searchCallInProgress = true;

        // TODO timeout for testing only
        $timeout(function() {
          patientService.getPatientsByName($scope.searchText).then(function (data) {
            $scope.searchCallInProgress = false;
            $scope.patients = data.patients;
          });
        }, 500);

      };
    }]);

  module.controller('MarCtrl', ['$scope', '$q',
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

      $scope.patients = [];

      patientService.getPatients().then(function (data) {
        $scope.patients = data.patients;
      });

      $scope.selectedPatient = null;
      $scope.patient = null;

      $scope.$watch('selectedPatient', function (newValue, oldValue) {
        if (newValue) {
          patientService.getFullPatient(newValue.id)
            .then(function (patient) {
              console.log(patient);
              $scope.patient = patient;
            });
        }
      });

      $scope.editMedTime = function (medId, hour) {
        console.log(medId, hour);
      };

      $scope.getCurrentHour = function () {
        // TODO fix
        return 9;
      };

      $scope.findSchedule = function (date, schedules) {
        return _.find(schedules, function (s) {
          return s.time == date.hour;
        });
      };

      $scope.isMedSchedule = function (date, schedules) {
        return !!$scope.findSchedule(date, schedules);
      };

      $scope.isPast = function (date) {
        return date.hour < $scope.getCurrentHour();
      };
      $scope.isOverdueSchedule = function (date, med) {
        if ($scope.isPast(date)) {
          var schedule = $scope.findSchedule(date, med.schedules);
          if (schedule) {
            return schedule.given === false;
          }
        }
        return false;
      };
    }]);

  module.controller('DemographicsCtrl', ['$scope', function ($scope) {

  }]);

  module.controller('NavbarCtrl', ['$scope',
    function ($scope) {

    }]);

  module.controller('LeftNavCtrl', ['$scope', '$location',
    function ($scope, $location) {
      $scope.links = [
        {
          text: 'Demographics',
          url: '/demographics'
        },
        {
          text: 'MAR',
          url: '/mar'
        }
      ];
    }]);

})();