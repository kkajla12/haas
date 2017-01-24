var shippo = require('shippo');

var ShippoFactory = function() {
  var shippoClient = shippo(process.env.SHIPPO_API_KEY);

  return {
    trackPackage: function(userId, carrier, trackingNumber, callback) {
      shippoClient.track.create({carrier: carrier, tracking_number: trackingNumber, metadata: userId})
      .then(
        function(status) {
          return callback(null, status);
        },
        function(err) {
          return callback(err);
        }
      );
    }
  };
};

module.exports = ShippoFactory;
