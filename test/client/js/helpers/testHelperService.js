(function () {
  'use strict';

  angular.module('TestHelper.services', [])
    .factory('testHelperService', [
      function () {
        return {
          getFullPatient: function () {
            return {
              "id": "1",
              "fullName": "Chris Montgomery",
              "medications": [
                {
                  "id": "1",
                  "name": "Imetrix",
                  "schedules": [
                    {
                      "patientId": "1",
                      "year": 2014,
                      "month": 3,
                      "day": 18,
                      "hour": 7,
                      "minute": 0,
                      "medId": "1",
                      "notes": "give orally",
                      "given": false
                    },
                    {
                      "patientId": "1",
                      "year": 2014,
                      "month": 3,
                      "day": 18,
                      "hour": 9,
                      "minute": 30,
                      "medId": "1",
                      "notes": "give orally",
                      "given": false
                    }
                  ]
                },
                {
                  "id": "2",
                  "name": "Zimotriptan",
                  "schedules": [
                    {
                      "patientId": "1",
                      "year": 2014,
                      "month": 3,
                      "day": 18,
                      "hour": 7,
                      "minute": 0,
                      "medId": "2",
                      "notes": null,
                      "given": true
                    }
                  ]
                },
                {
                  "id": "3",
                  "name": "Blaboblop",
                  "schedules": []
                }
              ]
            };
          }
        };
      }]);
})();
