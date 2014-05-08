var fs = require('fs');

module.exports = function(filepath){
  return function(callback){
    fs.readFile(filepath, callback);
  };
};