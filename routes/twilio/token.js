var express = require('express');
var router = express.Router();
var TokenService = require('../../services/twiliotokenservice');

// middleware for getting the logged-in user
// sets req.payload to the logged-in user payload
var auth = require('../middleware/authentication');

router.get('/', auth, function (req, res) {
  var deviceId = req.body.device;
  var identity = req.body.identity;
  var tokenService = new TokenService();

  var token = tokenService.generate(req.payload._id);

  res.json({
    token: token.toJwt()
  });
});

module.exports = router;
