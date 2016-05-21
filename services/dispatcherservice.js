var Twilio = require('twilio');
var WolframService = require('./wolframservice');
var WitService = require('./witservice');
var CustomQueryService = require('./customqueryservice');
var mapping = require('./mappings/dispatchermapping');

var DispatcherFactory = function(){
  return {
    dispatch: function(query, channelSid) {
      // Initialize Twilio client to send message reply
      var IpMessagingClient = Twilio.IpMessagingClient;
      var client = new IpMessagingClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      var service = client.services(process.env.TWILIO_IPM_SERVICE_SID);

      var wolframService = new WolframService();
      var witService = new WitService();
      var customQueryService = new CustomQueryService();

      customQueryService.query(query, function(err, message) {

        if (err) {
          // Provides a success callback and a failure callback
          // to the Wit Service to be executed depending on the
          // confidence of Wit's classification of the query
          //
          // Success: create appropriate response using third
          // party API calls.
          // Failure: query Wolfram Alpha service and return
          // its response.
          witService.getIntent(query, 1, function(result) {
            mapping[result.intent](result, function(body) {
              service.channels(channelSid).messages.create({
                body: body
              }).then(function(response) {
                  console.log(response);
                  console.log(result);
              }).fail(function(error) {
                  console.log(error);
              });
            });
          }, function() {
            wolframService.query(query, function(message) {
              service.channels(channelSid).messages.create({
                body: message
              }).then(function(response) {
                  console.log(response);
                  console.log(message);
              }).fail(function(error) {
                  console.log(error);
              });
            });
          });

        } else {
          service.channels(channelSid).messages.create({
            body: message
          }).then(function(response) {
              console.log(response);
              console.log(message);
          }).fail(function(error) {
              console.log(error);
          });
        }

      });
    }
  };
};

module.exports = DispatcherFactory;
