var readFile = require(__dirname + '/../lib/readFile');

module.exports = function* () {
  this.body = yield readFile(__dirname + '/../../test/data/patients.json');
};