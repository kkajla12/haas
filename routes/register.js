var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserEnv = mongoose.model('UserEnv');
var IpMessagingClient = require('twilio').IpMessagingClient;

router.post('/', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();
  user.username = req.body.username;
  user.name.first = req.body.firstname;
  user.name.last = req.body.lastname;
  user.setPassword(req.body.password);

  user.save(function(err, user) {
    if (err) { return next(err); }

    // initialize Twilio Chat client
    var client = new IpMessagingClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    var service = client.services(process.env.TWILIO_IPM_SERVICE_SID);

    // Create Channel with new user
    service.channels.create({
        friendlyName: 'HAAS',
        type: 'public'
    }).then(function(response) {
        console.log(response);
        // Create UserEnv when creating a new User
        var userEnv = new UserEnv({
          user: user,
          twilioChannelId: response.sid
        });
        userEnv.save(function(err, userEnv) {
          if (err) { return next(err); }
          return res.json({token: user.generateJWT()});
        });
    }).fail(function(error) {
        console.log(error);
    });
  });
});

module.exports = router;
