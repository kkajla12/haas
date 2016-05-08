// Dictionary mapping each specific intent to a function which
// creates the appropriate response to the user's request.

var ExpediaService = require('../expediaservice');
var expediaService = new ExpediaService();

module.exports = {

  retailStoreSearch: function(result, callback) {
    callback("Your intent is " + result.intent +
             " and your item is " + result.item);
  },

  retailComparisonSearch: function(result, callback) {
    callback("Your intent is " + result.intent +
             " and your item is " + result.item);
  },

  twitterTweet: function(result, callback) {
    callback("Your intent is " + result.intent +
             " and your tweet is " + result.tweet);
  },

  facebookPostStatus: function(result, callback) {
    callback("Your intent is " + result.intent +
             " and your Facebook status is " + result.fb_status);
  },

  generalFlightSearch: function(result, callback) {
    callback("Your intent is " + result.intent +
             " and you want to book a flight from " + result.location_from +
             " to " + result.location_to + " on " + result.datetime);
  },

  generalHotelSearch: function(result, callback) {
    expediaService.query(result.query, function(err, res) {
      callback(res);
    });
  }

}