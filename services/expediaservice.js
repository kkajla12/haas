var getJSON = require('./jsonservice');

var ExpediaFactory = function(){

  var getHotelsNLP = function(naturalLanguageRequest, callback) {
    var url = 'http://terminal2.expedia.com/x/nlp/results';
    var options = {
      apikey: process.env.EXPEDIA_CONSUMER_KEY,
      q: naturalLanguageRequest,
      verbose: false        
    };
    getJSON(url, options, function(err, res) {
      if (err) { return callback(err); }
      callback(null, JSON.parse(res));
    });
  };

  var getHotels = function(location, hotelIds, checkIn, checkOut, callback) {
    var url = 'http://terminal2.expedia.com:80/x/hotels';
    var options = {
      apikey: process.env.EXPEDIA_CONSUMER_KEY,
      maxhotels: 35,
      location: location.lat + ',' + location.lng,
      radius: '5km',
      hotelids: hotelIds.join(),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      sort: 'guestrating',
      order: 'desc',
      allroomtypes: false
    };
    getJSON(url, options, function(err, res) {
      if (err) { return callback(err); }
      callback(null, JSON.parse(res));
    });
  };

  var getHotelData = function(hotel) {
    var result = {};
    result.name = hotel.Name;
    if (hotel.Price !== undefined) {
      if (hotel.Price.TotalRate !== undefined) {
        result.price = hotel.Price.TotalRate.Value;
      } else {
        result.price = "N/A";
      }
    } else {
      result.price = "N/A";
    }
    if (hotel.GuestRating !== undefined) {
      result.rating = hotel.GuestRating;
    } else {
      result.rating = "N/A";
    }
    if (hotel.DetailsUrl !== undefined) {
      result.url = hotel.DetailsUrl;
    } else {
      result.url = "N/A";
    }
    return result;
  };

  var compareHotels = function(h1, h2) {
    if (h1.price === "N/A") {
      return 1;
    }
    if (h2.price === "N/A") {
      return -1;
    }
    return h1.price - h2.price;
  };

  return {
    query: function(request, callback) {
      getHotelsNLP(request, function(err, res) {
        if (err) { return callback(err); }
        var location = {
          lat: res.result.regions[0].center.lat,
          lng: res.result.regions[0].center.lng
        };
        var hotelIds = [];
        for (var i in res.result.hotels) {
          hotelIds.push(res.result.hotels[i].id);
        }
        var checkIn = '';
        var checkOut = '';
        for (var j in res.concepts) {
          if (res.concepts[j].type === 'DATE') {
            checkIn = res.concepts[j].domainValues[0].value;
            checkOut = res.concepts[j].domainValues[1].value;
          }
        }
        getHotels(location, hotelIds, checkIn, checkOut, function(err, res) {
          if (err) { return callback(err); }
          var hotels = [];
          for (var i in res.HotelInfoList.HotelInfo) {
            hotels.push(getHotelData(res.HotelInfoList.HotelInfo[i]));
          }
          hotels.sort(compareHotels);
          var message = "Here are five well-rated hotels in that area:\n";
          for (var i = 0; i < 5; i++) {
            var hotel = hotels[i];
            message += hotel.name + " ($" + hotel.price + ", " +
                       hotel.rating + " stars) - " + hotel.url + "\n";
          }
          callback(null, message);
        });
      });
    }
  };

};

module.exports = ExpediaFactory;
