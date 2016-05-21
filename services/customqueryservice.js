var customResponseMap = require("./mappings/customresponsemappings");
var customRegexMap = require("./mappings/customregexmappings");

var CustomQueryFactory = function(){

  var isAMatch = function(query, regexList) {
    for (var i in regexList) {
      if (regexList[i].test(query)) {
        return true;
      }
    }
  };

  return {
    query: function(dirtyQuery, callback) {
      var punctless = dirtyQuery.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g, "");
      var query = punctless.replace(/\s{2,}/g, " ");

      // Iterate through possible custom IDs, checking if the query
      // is accepted by one of the regular expressions
      for (var id in customRegexMap) {
        if ( customRegexMap.hasOwnProperty(id) ) {
          if ( isAMatch(query, customRegexMap[id]) ) {
            return callback(null, JSON.stringify(customResponseMap[id](dirtyQuery)));
          }
        }
      }

      // Cannot handle given query, so return an error
      callback(true);
    }
  };

};

module.exports = CustomQueryFactory;
