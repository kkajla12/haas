var express = require('express');
var router = express.Router();
var MessengerService = require('../../services/messengerservice');

function sendMessage(userId, messageText) {
  var messengerService = new MessengerService();

  messengerService.sendTextMessage(userId, messageText);
}

router.post('/', function (req, res) {
  var packageInfo = req.body;
  var status = packageInfo.tracking_status.status;
  var userId = packageInfo.metadata;
  var text;

  switch (status) {
    case 'DELIVERED':
      text = 'Your package was delivered!';
      break;
    case 'TRANSIT':
      text =
        "Your package is on its way. It's currently in " + tracking_status.location.city + ", " + tracking_status.location.state;

      if (status.eta != null) {
        var etaDate = new Date(status.eta);
        text += " and should be delivered on " + etaDate.toLocaleDateString() + " around " + etaDate.toLocaleTimeString();
      }
      break;
    case 'RETURNED':
      text = 'Your package was returned.';
      break;
    default:
      text = "I'm not sure about the status of your package right now.";
      break;
  }

  sendMessage(userId, text);

  res.sendStatus(200);
});

module.exports = router;
