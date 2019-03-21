const round = require('./round');

module.exports = function(str) {
  if(str === 'null')
    return null;
  else if(str === 'undefined')
    return undefined;
  else if(!isNaN(str))
    return round(str);
  else 
    return str;
};