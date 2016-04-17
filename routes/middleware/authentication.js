var jwt = require('express-jwt');

// same secret as user model; should use env variable
module.exports = jwt({secret: 'SECRET', userProperty: 'payload'});
