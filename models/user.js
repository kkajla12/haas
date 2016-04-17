var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  password: {
    hash: String,
    salt: String
  },
  name: {first: String, last: String}
});

UserSchema.methods.setPassword = function(password) {
  this.password.salt = crypto.randomBytes(16).toString('hex');
  this.password.hash =
    crypto.pbkdf2Sync(password, this.password.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash =
    crypto.pbkdf2Sync(password, this.password.salt, 1000, 64).toString('hex');
  return this.password.hash === hash;
}

UserSchema.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.USER_SECRET);
};

mongoose.model('User', UserSchema);
