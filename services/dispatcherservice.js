var Twilio = require('twilio');
var WolframService = require('./wolframservice');
var WitService = require('./witservice');

var DispatcherFactory = function(){
  return {
    dispatch: function(query, channelSid) {
      // Initialize Twilio client to send message reply
      var IpMessagingClient = Twilio.IpMessagingClient;
      var client = new IpMessagingClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      var service = client.services(process.env.TWILIO_IPM_SERVICE_SID);

      /*var wolframService = new WolframService();

      wolframService.query(query, function(message) {
        service.channels(channelSid).messages.create({
          body: message
        }).then(function(response) {
            console.log(response);
            console.log(message);
        }).fail(function(error) {
            console.log(error);
        });
      });*/

      var witService = new WitService();

      witService.getIntent(query, function(result) {
        service.channels(channelSid).messages.create({
          body: "Your intent was " + result.intent +
                ", your departure is from " + result.location_from +
                ", and your arrival is on " + result.datetime +
                " in " + result.location_to
        }).then(function(response) {
            console.log(response);
            console.log(result);
        }).fail(function(error) {
            console.log(error);
        });
      });
    }
  };
};

module.exports = DispatcherFactory;
