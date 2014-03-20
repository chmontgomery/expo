var readFile = require(__dirname + '/../lib/readFile'),
  _ = require('lodash');

function parseJSON(file) {
  return JSON.parse(file);
}

module.exports = {
  list: function* () {
    this.body = parseJSON(yield readFile(__dirname + '/../../test/data/patients.json'));
  },
  show: function* (id) {
    var allPatients = parseJSON(yield readFile(__dirname + '/../../test/data/patients.json'));
    var filtered = _.filter(allPatients.patients, function(p) {
      return p.id === id;
    });
    if (!filtered || filtered.length === 0) {
      return this.error('cannot find patient "' + id + '"', 404);
    } else if (filtered.length > 1) {
      return this.error('search for /patients/' + id + ' returned too many results: "' + filtered.length + '"', 500);
    }
    this.body = filtered[0];
  }
};