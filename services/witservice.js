var Wit = require('node-wit').Wit;
var mapping = require('./mappings/witmapping');

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
