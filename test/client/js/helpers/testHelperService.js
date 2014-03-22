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
                      "time": 7,
                      "medId": "1",
                      "notes": "give orally"
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
                      "time": 7,
                      "medId": "2",
                      "notes": null
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
