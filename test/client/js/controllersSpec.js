'use strict';

describe('controllers', function () {

  beforeEach(module('HomeCare.controllers'));
  beforeEach(module('HomeCare.services'));
  beforeEach(module('TestHelper.services'));

  describe('MarCtrl', function () {

    var $scope,
      $controller,
      ctrl,
      testHelperService,
      fullPatient;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $scope.patientString = '{}';
      $controller = $injector.get('$controller');
      ctrl = $controller('MarCtrl', { $scope: $scope});
      testHelperService = $injector.get('testHelperService');
      fullPatient = testHelperService.getFullPatient();
    }));

    describe('isMedSchedule', function () {
      it('should return true', function () {
        expect($scope.isMedSchedule({
          hour: 7,
          minute: 0
        }, fullPatient.medications[0].schedules)).toBe(true);
      });
      it('should return false', function () {
        expect($scope.isMedSchedule({
          hour: 8,
          minute: 0
        }, fullPatient.medications[0].schedules)).toBe(false);
      });
      it('should return false with no half hour', function () {
        expect($scope.isMedSchedule({
          hour: 7,
          minute: 30
        }, fullPatient.medications[0].schedules)).toBe(false);
      });
      it('should return true on half hour', function () {
        expect($scope.isMedSchedule({
          hour: 9,
          minute: 30
        }, fullPatient.medications[0].schedules)).toBe(true);
      });
    });

    describe('isPast', function () {
      it('should return true', function () {
        expect($scope.isPast({
          hour: 7,
          minute: 0
        })).toBe(true);
      });
      it('should return true', function () {
        expect($scope.isPast({
          hour: 9,
          minute: 26
        })).toBe(true);
      });
      it('should return false', function () {
        expect($scope.isPast({
          hour: 9,
          minute: 27
        })).toBe(false);
      });
      it('should return false', function () {
        expect($scope.isPast({
          hour: 9,
          minute: 28
        })).toBe(false);
      });
      it('should return false', function () {
        expect($scope.isPast({
          hour: 10,
          minute: 0
        })).toBe(false);
      });
    });

    describe('isOverdueSchedule', function () {
      it('should return true', function () {
        expect($scope.isOverdueSchedule({
          hour: 7,
          minute: 0
        }, fullPatient.medications[0])).toBe(true);
      });
      it('should return false', function () {
        expect($scope.isOverdueSchedule({
          hour: 9,
          minute: 0
        }, fullPatient.medications[0])).toBe(false);
      });
    });

  });
});
