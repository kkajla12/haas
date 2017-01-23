// Dictionary mapping each specific intent to a function which
// creates the appropriate response to the user's request.

var ExpediaService = require('../expediaservice');
var AmazonService = require('../amazonservice');
var Food2ForkService = require('../food2forkservice');
var ConnexityService = require('../connexityservice');

var expediaService = new ExpediaService();
var amazonService = new AmazonService();
var food2forkService = new Food2ForkService();
var connexityService = new ConnexityService();

module.exports = {
  retailStoreSearch: function(result, callback) {
    connexityService.retailQuery(result.item, function(connexityErr, connexityProducts) {
      amazonService.search(result.item, function(amazonErr, res) {
        var response = {
          messages: []
        };

        if (connexityErr && amazonErr) {
          response.messages.push({
            type: 'Text',
            text: "I wasn't able to find any results for that item."
          });

          return callback(reponse);
        }

        response.messages.push({
          type: 'Text',
          text: "Here's a list of places where that item is available"
        });

        var message = {
          type: 'GenericTemplate',
          titles: [],
          subtitles: [],
          urls: [],
          imageUrls: []
        };

        if(!amazonErr) {
          message.titles.push(res.title);
          message.subtitles.push(res.price);
          message.urls.push(res.url);
          message.imageUrls.push(res.imageUrl);
        }

        if(!connexityErr) {
          for(var i in connexityProducts) {
            var prod = connexityProducts[i];

            message.titles.push(prod.title);
            message.subtitles.push(prod.price);
            message.urls.push(prod.url);
            message.imageUrls.push(prod.imageUrl);
          }
        }

        response.messages.push(message);

        callback(response);
      });
    });
  },

  retailComparisonSearch: function(result, callback) {
    callback({
      messages: [{
        type: 'Text',
        text: "Your intent is " + result.intent
             + " and your item is " + result.item
      }]
    });
  },

  generalFlightSearch: function(result, callback) {
    expediaService.flightQuery(result, function(err, res) {
      if (err) {
        var response = {
          msg: "I'm sorry, I wasn't able to find any flight results. "
               + "You must specify a travel date and use valid three "
               + "letter airport codes.",
          voicemsg: 'I\'m sorry, I wasn\'t able to find any flight results.',
          links: []
        };
        return callback(JSON.stringify(response));
      }

      var response = {};
      var links = [];
      response.msg = "Here are the cheapest flights from "
                     + result.location_from + " to " + result.location_to
                     + " that I found:",
      response.voicemsg = response.msg;

      for (var i in res) {
        links.push({
          text: res[i].airline + " "
                + res[i].flightNums.slice(0, res[i].flightNums.length - 1).join(", ")
                + (res[i].flightNums.length > 1 ? " and " : "")
                + res[i].flightNums[res[i].flightNums.length - 1],
          url: res[i].url,
          majorInfo: " Departs " + res[i].departTime
                     + "<br>Arrives " + res[i].arriveTime,
          minorInfo: res[i].price
        });
      }
      response.links = links;

      callback(JSON.stringify(response));
    });
  },

  generalHotelSearch: function(result, callback) {
    expediaService.hotelQuery(result.query, function(err, hotels) {
      if (err) {
        var response = {
          msg: "I'm sorry, I wasn't able to find any hotel results. "
               + "You must specify a valid location and date.",
          voicemsg: 'I\'m sorry, I wasn\'t able to find any hotel results.',
          links: []
        };
        return callback(JSON.stringify(response));
      }

      var response = {};
      var links = [];
      response.msg = "Here are some well-rated hotels in that area:";
      response.voicemsg = response.msg;

      var count = 0;
      for (var i = 0; count < 5 && i < hotels.length; i++) {
        var hotel = hotels[i];
        if (hotel.price !== "N/A") {
          links.push({
            text: hotel.name,
            url: hotel.url,
            majorInfo: '$' + hotel.price,
            minorInfo: hotel.rating + ' stars'
          });
          count++;
        }
      }

      if (count === 0) {
        response.msg = "I'm sorry, there are no hotels available in that "
                       + "area for the specified date.";
        response.voicemsg = response.msg;
        response.links = [];
      } else {
        response.links = links;
      }

      callback(JSON.stringify(response));
    });
  },

  recipeSearch: function(result, callback) {
    food2forkService.recipeQuery(result.item, function(err, res) {
      if (err) {
        var response = {
          messages: [{
            type: 'Text',
            text: "I'm sorry, I couldn't find any recipes for " + result.item
          }]
        };

        return callback(response);
      }

      var response = {
        messages: [
          {
            type: 'Text',
            text: "Here are a few recipes for " + result.item
          },
          {
            type: 'GenericTemplate',
            titles: [],
            subtitles: [],
            urls: [],
            imageUrls: []
          }
        ]
      };

      res.forEach(function(element) {
        var message = response.messages[1];
        message.titles.push(element.title);
        message.subtitles.push(element.publisher);
        message.urls.push(element.url);
        message.imageUrls.push(element.imageUrl);
      });

      callback(response);
    });
  },

  recipeIngredientSearch: function(result, callback) {
    food2forkService.recipeIngredientQuery(result.items, function(err, res) {
      if (err) {
        var response = {
          messages: [{
            type: 'Text',
            text: "I'm sorry, I couldn't find any good recipes for those items."
          }]
        };

        return callback(response);
      }

      var response = {
        messages: [
          {
            type: 'Text',
            text: "Here are a few recipes using "
                 + result.items.slice(0, result.items.length - 1).join(", ")
                 + (result.items.length > 1 ? " and " : "")
                 + result.items[result.items.length - 1] + ":"
          },
          {
            type: 'GenericTemplate',
            titles: [],
            subtitles: [],
            urls: [],
            imageUrls: []
          }
        ]
      };

      res.forEach(function(element) {
        var message = response.messages[1];
        message.titles.push(element.title);
        message.subtitles.push(element.publisher);
        message.urls.push(element.url);
        message.imageUrls.push(element.imageUrl);
      });

      callback(response);
    });
  }

}
