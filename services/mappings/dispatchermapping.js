// Dictionary mapping each specific intent to a function which
// creates the appropriate response to the user's request.

var ExpediaService = require('../expediaservice');
var AmazonService = require('../amazonservice');
var Food2ForkService = require('../food2forkservice');

var expediaService = new ExpediaService();
var amazonService = new AmazonService();
var food2forkService = new Food2ForkService();

function createAnchor(href, text) {
    var anchor = '';
    anchor += '<a href="';
    anchor += href;
    anchor += '" style=\'color:white\' target=\'_blank\'>'; // TODO: css class
    anchor += text;
    anchor += "</a>";
    return anchor;
}

module.exports = {
  retailStoreSearch: function(result, callback) {
    amazonService.search(result.item, function(err, res) {
      var response = {
        msg: result.item + " is available at Amazon for " + res,
        voicemsg: ''
      };
      response.voicemsg = response.msg;
      callback(JSON.stringify(response));
    })
  },

  retailComparisonSearch: function(result, callback) {
    var response = {
      msg: "Your intent is " + result.intent
           + " and your item is " + result.item,
      voicemsg: ''
    };
    response.voicemsg = response.msg;
    callback(JSON.stringify(response));
  },

  generalFlightSearch: function(result, callback) {
    expediaService.flightQuery(result, function(err, res) {
      if (err) {
        var response = {
          msg: "I'm sorry, I wasn't able to find any flight results. "
               + "You must specify a travel date and use valid three "
               + "letter airport codes.",
          voicemsg: 'I\'m sorry, I wasn\'t able to find any flight results.'
        };
        return callback(JSON.stringify(response));
      }

      var response = {
        msg: "Here are the cheapest flights from " + result.location_from
             + " to " + result.location_to + " that I found:",
        voicemsg: ''
      };
      response.voicemsg = response.msg;

      for (var i in res) {
        var text = res[i].airline
                   + " Flight" + (res[i].flightNums.length > 1 ? "s " : " ")
                   + res[i].flightNums.slice(0, res[i].flightNums.length - 1).join(", ")
                   + (res[i].flightNums.length > 1 ? " and " : "")
                   + res[i].flightNums[res[i].flightNums.length - 1]
                   + " departing on " + res[i].departTime
                   + " and arriving on " + res[i].arriveTime + ", "
                   + res[i].price;

        response.msg += "<br>";
        response.msg += createAnchor(res[i].url, text);
      }

      callback(JSON.stringify(response));
    });
  },

  generalHotelSearch: function(result, callback) {
    expediaService.hotelQuery(result.query, function(err, hotels) {
      var response = {
        msg: "Here are five well-rated hotels in that area:",
        voicemsg: ''
      };
      response.voicemsg = response.msg;

      for (var i = 0; i < 5 && i < hotels.length; i++) {
        var hotel = hotels[i];
        var text = hotel.name + " ($" + hotel.price + ", " + hotel.rating + " stars)";

        response.msg += "<br>";
        response.msg += createAnchor(hotel.url, text);
      }

      callback(JSON.stringify(response));
    });
  },

  recipeSearch: function(result, callback) {
    food2forkService.recipeQuery(result.item, function(err, res) {
      if (err) {
        var response = {
          msg: "I'm sorry, I couldn't find any recipes for " + result.item,
          voicemsg: ''
        };
        response.voicemsg = response.msg;
        return callback(JSON.stringify(response));
      }

      var response = {
        msg: "Here are a few recipes for " + result.item + ":",
        voicemsg: ''
      };
      response.voicemsg = response.msg;

      for (var i in res) {
        response.msg += "<br>";
        response.msg += createAnchor(res[i].url, res[i].title);
      }

      callback(JSON.stringify(response));
    });
  },

  recipeIngredientSearch: function(result, callback) {
    food2forkService.recipeIngredientQuery(result.items, function(err, res) {
      if (err) {
        var response = {
          msg: "I'm sorry, I couldn't find any good recipes for those items.",
          voicemsg: ''
        };
        response.voicemsg = response.msg;
        return callback(JSON.stringify(response));
      }

      var response = {
        msg: "Here are a few recipes using "
             + result.items.slice(0, result.items.length - 1).join(", ")
             + (result.items.length > 1 ? " and " : "")
             + result.items[result.items.length - 1] + ":",
        voicemsg: ''
      };
      response.voicemsg = response.msg;

      for (var i in res) {
        response.msg += "<br>";
        response.msg += createAnchor(res[i].url, res[i].title);
      }

      callback(JSON.stringify(response));
    });
  }

}
