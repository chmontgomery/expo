var render = require(__dirname + '/../lib/render'),
  patientService = require('../services/patientService');

module.exports = {
  list: function* () {
    this.body = yield render('demographics');
  },
  show: function* (id) {
    var patient = yield patientService.get(id);
    this.body = yield render('demographics', {
      patient: patient
    });
  }
};