var express = require('express');
var router = express.Router();

router.use('/token', require('./token'));

module.exports = router;
