var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserEnv = mongoose.model('UserEnv');
var User = mongoose.model('User');

// middleware for getting the logged-in user
// sets req.payload to the logged-in user payload
var auth = require('../middleware/authentication');

// middleware for :userId parameter
router.param('userId', function(req, res, next, id) {
  UserEnv.findOne({user: id}, function(err, env) {
    if (err) { return next(err); }
    if (!env) {
      return next(new Error('can\'t find env'));
    }
    User.findById(id, function(err, user) {
      if (err) { return next(err); }
      if (!user) {
        return next(new Error('can\'t find user'));
      }
      var userObj = user.toObject();
      delete userObj.password;
      req.user = userObj;
      req.userEnv = env;
      return next();
    });
  });
});

router.get('/:userId', auth, function(req, res, next) {
  res.json({user: req.user, userEnv: req.userEnv});
});

router.put('/:userId', auth, function(req, res, next) {
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.userEnv[key] = req.body[key];
    }
  }
  req.userEnv.save(function(err, env) {
    if (err) { return next(err); }
    return res.json({user: req.user, userEnv: req.userEnv});
  });
});

module.exports = router;
