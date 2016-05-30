var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser');
var passport = require('passport');
var methodOverride = require('express-method-override');

// https://github.com/motdotla/dotenv
require('dotenv').config();

var app = express();

// load models and connect to mongodb
// use 'mongod --dbpath /data/haasdb'
var mongoose = require('mongoose');
require('./models/user');
require('./models/userenv');
require('./config/passport');  // after user model
mongoose.connect('mongodb://localhost/haasdb');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(xmlparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride());

app.use(passport.initialize());

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/user', require('./routes/user/user'));
app.use('/twilio', require('./routes/twilio/twilio'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
