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
    getIntent: function(request, minConfidence, callback) {
      client.message(request, function(err, data) {
        if (err) { return callback(err); } 

        console.log(JSON.stringify(data));

        var conf = data.outcomes[0].confidence;
        if(conf < minConfidence) {
          return callback(new Error("Confidence threshold not met."));
        }

        var result = {};
        var intent = data.outcomes[0].entities.intent[0].value;
        try {
          result = mapping[intent](data);
          result.query = request;
        } catch (ex) {
          return callback(ex);
        }

        // confidence level is met, and mapping was successful
        return callback(null, result);
      });
    }
  };
};

module.exports = WitFactory;
