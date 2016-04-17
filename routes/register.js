var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();
  user.username = req.body.username;
  user.name.first = req.body.firstname;
  user.name.last = req.body.lastname;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) { return next(err); }
    return res.json({token: user.generateJWT()});
  });
});

module.exports = router;
