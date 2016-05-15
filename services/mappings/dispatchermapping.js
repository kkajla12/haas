// Dictionary mapping each specific intent to a function which
// creates the appropriate response to the user's request.

var ExpediaService = require('../expediaservice');
var AmazonService = require('../amazonservice');
var Food2ForkService = require('../food2forkservice');

var expediaService = new ExpediaService();
var amazonService = new AmazonService();
var food2forkService = new Food2ForkService();

module.exports = {

  retailStoreSearch: function(result, callback) {
    amazonService.search(result.item, function(err, res) {
      callback(result.item + " is available at:\n Amazon for " + res);
    });
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
    expediaService.flightQuery(result, function(err, res) {
      if (err) {
        return callback("I'm sorry, I wasn't able to find any flight results. " + 
                 "You must specify a travel date and use valid three letter " +
                 "airport codes.");
      }
      var response = "Here are the cheapest flights from " + result.location_from +
                     " to " + result.location_to + " that I found:\n";
      for (var i in res) {
        response += res[i].airline + 
                    " Flight" + (res[i].flightNums.length > 1 ? "s " : " ") +
                    res[i].flightNums.slice(0, res[i].flightNums.length - 1).join(", ") +
                    (res[i].flightNums.length > 1 ? " and " : "") +
                    res[i].flightNums[res[i].flightNums.length - 1] +
                    " departing on " + res[i].departTime +
                    " and arriving on " + res[i].arriveTime + ", " +
                    res[i].price + " " +
                    res[i].url + "\n";
      }
      callback(response);
    });
  },

  generalHotelSearch: function(result, callback) {
    expediaService.hotelQuery(result.query, function(err, res) {
      callback(res);
    });
  },

  recipeSearch: function(result, callback) {
    food2forkService.recipeQuery(result.item, function(err, res) {
      if (err) {
        return callback("I'm sorry, I couldn't find any recipes for " + result.item);
      }
      var response = "Here are a few recipes for " + result.item + ":\n";
      var prefix = "";
      for (var i in res) {
        response += prefix + res[i].title + " (" + res[i].url + ")";
        prefix = "\n";
      }
      callback(response);
    });
  },

  recipeIngredientSearch: function(result, callback) {
    food2forkService.recipeIngredientQuery(result.items, function(err, res) {
      if (err) { 
        return callback("I'm sorry, I couldn't find any good recipes for those items.");
      }
      var response = "Here are a few recipes for " + result.item + ":\n";
      var prefix = "";
      for (var i in res) {
        response += prefix + res[i].title + " (" + res[i].url + ")";
        prefix = "\n";
      }
      callback(response);
    });
  }

}
