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

      $scope.patients = [];

      patientService.getPatients().then(function (data) {
        $scope.patients = data.patients;
      });

      $scope.selectedPatient = null;
      $scope.patient = null;

      $scope.$watch('selectedPatient',function(newValue, oldValue){
        if (newValue) {
          patientService.getFullPatient(newValue.id)
            .then(function(patient) {
              console.log(patient);
              $scope.patient = patient;
            });
        }
      });

      $scope.editMedTime = function (medId, hour) {
        console.log(medId, hour);
      };
    }]);

  module.controller('NavbarCtrl', ['$scope',
    function ($scope) {
    }]);

})();