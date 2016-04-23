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
    retailStoreSearch: function(data) {
      return {
        intent: 'retailStoreSearch',
        item: data.outcomes[0].entities.item[0].value
      };
    },
    retailComparisonSearch: function(data) {
      return {
        intent: 'retailComparisonSearch',
        item: data.outcomes[0].entities.item[0].value
      };
    },
    twitterTweet: function(data) {
      return {
        intent: 'twitterTweet',
        tweet: data.outcomes[0].entities.tweet[0].value
      };
    },
    facebookPostStatus: function(data) {
      return {
        intent: 'facebookPostStatus',
        fb_status: data.outcomes[0].entities.fb_status[0].value
      };
    },
    generalFlightSearch: function(data) {
      return {
        intent: 'generalFlightSearch',
        location_from: data.outcomes[0].entities.from[0].value,
        location_to: data.outcomes[0].entities.to[0].value,
        datetime: data.outcomes[0].entities.datetime[0].value
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
          console.log(JSON.stringify(data));
          var intent = data.outcomes[0].entities.intent[0].value;
          result = mapping[intent](data);
        }
        callback(result);
      });
    }
  };
};

module.exports = WitFactory;
