var express = require('express');
var router = express.Router();
var xmlparser = require('express-xml-bodyparser');
var Twilio = require('twilio');
var DispatcherService = require('../../services/dispatcherservice');

router.post('/', Twilio.webhook({validate: false}), xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
  res.send({});

  var dispatcherService = new DispatcherService();
  dispatcherService.dispatch(req.body.Body, req.body.ChannelSid);
});

module.exports = router;
