var express = require('express');
var router = express.Router();

router.use('/token', require('./token'));
router.use('/inbound', require('./inbound'));

module.exports = router;
