'use strict';

describe('services', function () {

  beforeEach(module('HomeCare.services'));
  beforeEach(module('TestHelper.services'));

  describe('patientService', function () {
    var $scope,
      $q,
      patientService,
      testHelperService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      patientService = $injector.get('patientService');
      testHelperService = $injector.get('testHelperService');
    }));

    it('should return inflated patient object', function () {

      var patient = {
          "id": "1",
          "fullName": "Chris Montgomery",
          "medications": [
            {
              "id": "1"
            },
            {
              "id": "2"
            },
            {
              "id": "3"
            }
          ]
        },
        schedules = [
          {
            "patientId": "1",
            "year": 2014,
            "month": 3,
            "day": 18,
            "time": 7,
            "medId": "1",
            "notes": "give orally",
            "given": false
          },
          {
            "patientId": "1",
            "year": 2014,
            "month": 3,
            "day": 18,
            "time": 7,
            "medId": "2",
            "notes": null,
            "given": true
          },
          {
            "patientId": "2",
            "year": 2014,
            "month": 3,
            "day": 18,
            "time": 7,
            "medId": "1",
            "notes": null,
            "given": false
          }
        ],
        allMedications = [
          {
            "id": "1",
            "name": "Imetrix"
          },
          {
            "id": "2",
            "name": "Zimotriptan"
          },
          {
            "id": "3",
            "name": "Blaboblop"
          }
        ];

      var result = patientService.createFullPatient(patient, schedules, allMedications);

      expect(result).toEqual(testHelperService.getFullPatient())
    });
  });

  describe('urlService', function () {

    var urlService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
      urlService = $injector.get('urlService');
    }));

    it('should return null', function() {
      urlService.getSearchString = function() {
        return '';
      };
      expect(urlService.getParam('id')).toEqual(null);
    });

    it('should get param', function() {
      urlService.getSearchString = function() {
        return '?id=1';
      };
      expect(urlService.getParam('id')).toEqual('1');
    });

    it('should get param at end', function() {
      urlService.getSearchString = function() {
        return '?test=3&id=1';
      };
      expect(urlService.getParam('id')).toEqual('1');
    });

    it('should get param in middle', function() {
      urlService.getSearchString = function() {
        return '?test=3&id=1&another=blah';
      };
      expect(urlService.getParam('id')).toEqual('1');
    });

  });
});
