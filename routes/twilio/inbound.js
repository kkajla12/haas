var express = require('express');
var router = express.Router();
var xmlparser = require('express-xml-bodyparser');
var Twilio = require('twilio');

router.post('/', Twilio.webhook({validate: false}), xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
  //console.log(req.body);

  // Initialize Twilio client to send message reply
  var IpMessagingClient = Twilio.IpMessagingClient;
  var client = new IpMessagingClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  var service = client.services(process.env.TWILIO_IPM_SERVICE_SID);

  res.send({});

  service.channels(req.body.ChannelSid).messages.create({
      body: 'Message from HAAS!'
  }).then(function(response) {
      console.log(response);
  }).fail(function(error) {
      console.log(error);
  });
});

module.exports = router;
