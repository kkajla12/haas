var express = require('express');
var router = express.Router();
var xmlparser = require('express-xml-bodyparser');
var Twilio = require('twilio');
var Wolfram = require('wolfram').createClient(process.env.WOLFRAM_ALPHA_APP_ID);

router.post('/', Twilio.webhook({validate: false}), xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
  //console.log(req.body);

  // Initialize Twilio client to send message reply
  var IpMessagingClient = Twilio.IpMessagingClient;
  var client = new IpMessagingClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  var service = client.services(process.env.TWILIO_IPM_SERVICE_SID);

  res.send({});

  Wolfram.query(req.body.Body, function(err, result) {
    if(err) {
      console.log(err);
    }
    var message = "";
    for (var i in result) {
      if (result[i].title === "Result") {
        message = result[i].subpods[0].value;
      }
    }
    if (message === "") {
      message = "I'm sorry, I dont know.";
    }
    service.channels(req.body.ChannelSid).messages.create({
      body: message
    }).then(function(response) {
        console.log(response);
        console.log(message);
    }).fail(function(error) {
        console.log(error);
    });
  });

});

module.exports = router;
