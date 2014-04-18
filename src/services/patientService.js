var readFile = require(__dirname + '/../lib/readFile'),
  scheduleService = require('./scheduleService'),
  medicationService = require('./medicationService'),
  _ = require('lodash');

module.exports = {
  get: function* (id) {
    var allPatients = JSON.parse(yield readFile(__dirname + '/../../test/data/patients.json'));
    var filtered = _.filter(allPatients.patients, function(p) {
      return p.id === id;
    });
    return filtered[0];
  },
  getFull: function* (id) {
    // TODO do these in parallel for performance
    var patient = yield this.get(id);
    var schedules = yield scheduleService.get(id);
    var allMedications = yield medicationService.list();

    _.each(_.cloneDeep(patient.medications), function (patientMed, i) {
      var medication = _.find(allMedications, function (med) {
        return med.id === patientMed.id;
      });
      patient.medications[i] = _.merge(patientMed, medication);

      patient.medications[i].schedules = _.filter(schedules, function (s) {
        return s.patientId === patient.id && s.medId === patientMed.id;
      });
    });

    return patient;
  }
};