// var http = require('http');
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
      maxhotels: 5,
      location: location.lat + ',' + location.lng,
      radius: '5km',
      hotelids: hotelIds.join(),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      sort: 'price',
      order: 'asc'
    };
    getJSON(url, options, function(err, res) {
      if (err) { return callback(err); }
      callback(null, JSON.parse(res));
    });
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
          var message = "Here are 5 hotels in that area:\n";
          for (var i in res.HotelInfoList.HotelInfo) {
            message += res.HotelInfoList.HotelInfo[i].Name + "\n";
          }
          callback(null, message);
        });
      });
    }
  };

};

module.exports = ExpediaFactory;
