var readFile = require(__dirname + '/../lib/readFile'),
  patientService = require('../services/patientService');

module.exports = {
  list: function* () {
    this.body = JSON.parse(yield readFile(__dirname + '/../../test/data/patients.json'));
  },
  show: function* (id) {
    var patient = yield patientService.get(id);
    if (!patient) {
      return this.error('cannot find patient "' + id + '"', 404);
    }
    this.body = patient;
  }
};