var Wit = require('node-wit').Wit;

var WitFactory = function() {
  var actions = {
    say(sessionId, context, message, cb) {
      console.log(message + " hello world");
      cb();
    },
    merge(sessionId, context, entities, message, cb) {
      cb(context);
    },
    error(sessionId, context, err) {
      console.log(err.message);
    }
  };
  var client = new Wit(process.env.WIT_ACCESS_TOKEN, actions);

  // Dictionary, mapping each specific intent to a function which
  // retrieves the appropriate fields from the Wit JSON response
  // that will be returned.
  // NOTE: this will be moved to it's own file later
  var mapping = {
    retailPriceSearch: function(data) {
      return {
        intent: 'retailPriceSearch',
        item: data.outcomes[0].entities.item[0].value
      };
    },
    retailStoreSearch: function(data) {
      return {
        intent: 'retailStoreSearch',
        item: data.outcomes[0].entities.item[0].value
      };
    }
  }

  return {
    getIntent: function(request, callback) {
      client.message(request, function(err, data) {
        var result = {};
        if (err) {
          console.log('Oops! Got an error: ' + err);
        } else {
          console.log(data);
          var intent = data.outcomes[0].entities.intent[0].value;
          result = mapping[intent](data);
        }
        callback(result);
      });
    }
  };
};

module.exports = WitFactory;
