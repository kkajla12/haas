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
      var response = {
        type: 'retailStoreSearch',
        partials: {
          text: result.item + " is available at Amazon for " + res
        },
        voicemsg: ''
      };
      response.voicemsg = response.partials.text;
      callback(JSON.stringify(response));
    })
  },

  retailComparisonSearch: function(result, callback) {
    var response = {
      type: "retailComparisonSearch",
      partials: {
        text: "Your intent is " + result.intent
              + " and your item is " + result.item
      },
      voicemsg: ''
    };
    response.voicemsg = response.partials.text;
    callback(JSON.stringify(response));
  },

  twitterTweet: function(result, callback) {
    var response = {
    type: "twitterTweet",
    partials: {
      text: "Your intent is " + result.intent
            + " and your tweet is " + result.tweet
    },
      voicemsg: ''
    };
    response.voicemsg = response.partials.text;
    callback(JSON.stringify(response));
  },

  facebookPostStatus: function(result, callback) {
    var response = {
      type: "facebookPostStatus",
      partials: {
        text: "Your intent is " + result.intent
              + " and your Facebook status is " + result.fb_status
      },
      voicemsg: ''
    };
    response.voicemsg = response.partials.text;
    callback(JSON.stringify(response));
  },

  generalFlightSearch: function(result, callback) {
    expediaService.flightQuery(result, function(err, res) {
      if (err) {
        var response = {
          type: 'error',
          errmsg: "I'm sorry, I wasn't able to find any flight results. "
                  + "You must specify a travel date and use valid three "
                  + "letter airport codes.",
          voicemsg: ''
        };
        response.voicemsg = response.partials.text;
        return callback(JSON.stringify(response));
      }

      var response = {
        type: 'generalFlightSearch',
        partials: {
          text: "Here are the cheapest flights from " + result.location_from
                 + " to " + result.location_to + " that I found:",
          urls: []
        },
        voicemsg: "Here are the cheapest flights from " + result.location_from
                 + " to " + result.location_to + " that I found:\n"
      };

      for (var i in res) {
        var text = res[i].airline
                   + " Flight" + (res[i].flightNums.length > 1 ? "s " : " ")
                   + res[i].flightNums.slice(0, res[i].flightNums.length - 1).join(", ")
                   + (res[i].flightNums.length > 1 ? " and " : "")
                   + res[i].flightNums[res[i].flightNums.length - 1]
                   + " departing on " + res[i].departTime
                   + " and arriving on " + res[i].arriveTime + ", "
                   + res[i].price;

        response.partials.urls.push({
          href: res[i].url,
          text: text
        });

        response.voicemsg += text;
        response.voicemsg += "\n";
      }

      callback(JSON.stringify(response));
    });
  },

  // TODO: move the code from expediaservice.js
  generalHotelSearch: function(result, callback) {
    expediaService.hotelQuery(result.query, function(err, res) {
      callback(res);
    });
  },

  recipeSearch: function(result, callback) {
    food2forkService.recipeQuery(result.item, function(err, res) {
      if (err) {
        var response = {
          type: 'error',
          errmsg: "I'm sorry, I couldn't find any recipes for " + result.item,
          voicemsg: ''
        };
        response.voicemsg = response.partials.text;
        return callback(JSON.stringify(response));
      }

      var response = {
        type: 'recipeSearch',
        partials: {
          text: "Here are a few recipes for " + result.item + ":\n",
          urls: []
        },
        voicemsg: "Here are a few recipes for " + result.item + ":\n"
      }
      for (var i in res) {
        response.partials.urls.push({
          href: res[i].url,
          text: res[i].title
        });

        response.voicemsg += res[i].title;
        response.voicemsg += "\n";
      }

      callback(JSON.stringify(response));
    });
  },

  recipeIngredientSearch: function(result, callback) {
    food2forkService.recipeIngredientQuery(result.items, function(err, res) {
      if (err) {
        var response = {
          type: 'error',
          errmsg: "I'm sorry, I couldn't find any good recipes for those items.",
          voicemsg: ''
        };
        response.voicemsg = response.partials.text;
        return callback(JSON.stringify(response));
      }

      var response = {
        type: 'recipeSearch',
        partials: {
          text: "Here are a few recipes for " + result.item + ":\n",
          urls: []
        },
        voicemsg: "Here are a few recipes for " + result.item + ":\n"
      }
      for (var i in res) {
        response.partials.urls.push({
          href: res[i].url,
          text: res[i].title
        });

        response.voicemsg += res[i].title;
        response.voicemsg += "\n";
      }

      callback(JSON.stringify(response));
    });
  }

}
