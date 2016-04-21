var Twilio = require('twilio');
var WolframService = require('./wolframservice');

var DispatcherFactory = function(){
  return {
    dispatch: function(query, channelSid) {
      // Initialize Twilio client to send message reply
      var IpMessagingClient = Twilio.IpMessagingClient;
      var client = new IpMessagingClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      var service = client.services(process.env.TWILIO_IPM_SERVICE_SID);

      var wolframService = new WolframService();

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
    }
  };
};

module.exports = DispatcherFactory;
