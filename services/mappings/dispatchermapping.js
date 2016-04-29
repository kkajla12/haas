// Dictionary mapping each specific intent to a function which
// creates the appropriate response to the user's request.
// NOTE: Need to add error handling to prevent server from crashing
// when response object does not contain the expected properties.

module.exports = {

  retailStoreSearch: function(result) {
    return "Your intent is " + result.intent +
           " and your item is " + result.item;
  },

  retailComparisonSearch: function(result) {
    return "Your intent is " + result.intent +
           " and your item is " + result.item;
  },

  twitterTweet: function(result) {
    return "Your intent is " + result.intent +
           " and your tweet is " + result.tweet;
  },

  facebookPostStatus: function(result) {
    return "Your intent is " + result.intent +
           " and your Facebook status is " + result.fb_status;
  },

  generalFlightSearch: function(result) {
    return "Your intent is " + result.intent +
           " and you want to book a flight from " + result.location_from +
           " to " + result.location_to + " on " + result.datetime;
  }

}
