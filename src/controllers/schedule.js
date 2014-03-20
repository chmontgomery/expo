var readFile = require(__dirname + '/../lib/readFile'),
  _ = require('lodash');

function parseJSON(file) {
  return JSON.parse(file);
}

module.exports = {
  list: function* () {
    this.body = parseJSON(yield readFile(__dirname + '/../../test/data/schedule.json'));
  },
  show: function* (patientId) {
    var allSchedules = parseJSON(yield readFile(__dirname + '/../../test/data/schedule.json'));
    var filtered = _.filter(allSchedules.schedules, function(s) {
      return s.patientId === patientId;
    });
    this.body = {
      "schedules": filtered
    };
  }
};