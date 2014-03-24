'use strict';

describe('controllers', function () {

  beforeEach(module('HomeCare.controllers'));
  beforeEach(module('HomeCare.services'));
  beforeEach(module('TestHelper.services'));

  describe('HomeCtrl', function () {

    var $scope,
      $controller,
      ctrl,
      testHelperService,
      fullPatient;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $controller = $injector.get('$controller');
      ctrl = $controller('HomeCtrl', { $scope: $scope});
      testHelperService = $injector.get('testHelperService');
      fullPatient = testHelperService.getFullPatient();
    }));

    describe('isMedSchedule', function () {
      it('should return true', function () {
        expect($scope.isMedSchedule({
          hour: 7
        },fullPatient.medications[0].schedules)).toBe(true);
      });
      it('should return false', function () {
        expect($scope.isMedSchedule({
          hour: 8
        },fullPatient.medications[0].schedules)).toBe(false);
      });
    });

    describe('isPast', function () {
      it('should return true', function () {
        expect($scope.isPast({
          hour: 7
        })).toBe(true);
      });
      it('should return false', function () {
        expect($scope.isPast({
          hour: 10
        })).toBe(false);
      });
    });

    describe('isOverdueSchedule', function () {
      it('should return true', function () {
        expect($scope.isOverdueSchedule({
          hour: 7
        },fullPatient.medications[0])).toBe(true);
      });
      it('should return false', function () {
        expect($scope.isOverdueSchedule({
          hour: 9
        },fullPatient.medications[0])).toBe(false);
      });
    });

  });
});
