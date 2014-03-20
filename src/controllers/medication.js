var readFile = require(__dirname + '/../lib/readFile'),
  _ = require('lodash');

function parseJSON(file) {
  return JSON.parse(file);
}

module.exports = {
  list: function* () {
    this.body = parseJSON(yield readFile(__dirname + '/../../test/data/medication.json'));
  },
  show: function* (id) {
    var allMedications = parseJSON(yield readFile(__dirname + '/../../test/data/medication.json'));
    var filtered = _.filter(allMedications.medications, function(s) {
      return s.id === id;
    });
    if (!filtered || filtered.length === 0) {
      return this.error('cannot find medication "' + id + '"', 404);
    } else if (filtered.length > 1) {
      return this.error('search for /medications/' + id + ' returned too many results: "' + filtered.length + '"', 500);
    }
    this.body = filtered[0];
  }
};