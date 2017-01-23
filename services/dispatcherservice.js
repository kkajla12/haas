var WolframService = require('./wolframservice');
var WitService = require('./witservice');
var CustomQueryService = require('./customqueryservice');
var mapping = require('./mappings/dispatchermapping');

var DispatcherFactory = function(){
  return {
    dispatch: function(userId, query, callback) {
      console.log('inside dispatch');

      var wolframService = new WolframService();
      var witService = new WitService();
      var customQueryService = new CustomQueryService();

      customQueryService.query(query, function(err, message) {

        if (err) {
          // Failed to match with custom query.
          // Attempt to grab intent from query using wit.
          witService.getIntent(query, 0.998, function(err, result) {
            if (err) {
              // Failure: query Wolfram Alpha service and return
              // its response.
              wolframService.query(query, function(message) {
                return callback(message);
              });
            } else {
              // Success: create appropriate response using third
              // party API calls.
              mapping[result.intent](userId, result, function(body) {
                return callback(body);
              });
            }
          });
        } else {
          // Successfully matched with custom query, so send back
          // custom response.
          return callback(message);
        }

      });
    }
  };
};

module.exports = DispatcherFactory;
