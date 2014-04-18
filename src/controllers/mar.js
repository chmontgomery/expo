var render = require(__dirname + '/../lib/render'),
  patientService = require('../services/patientService');

module.exports = {
  list: function* () {
    this.body = yield render('mar');
  },
  show: function* (id) {
    var patient = yield patientService.getFull(id);
    this.body = yield render('mar', {
      patient: patient
    });
  },
  showJSON: function* (id) {
    var patient = yield patientService.getFull(id);
    this.body = patient;
  }
};