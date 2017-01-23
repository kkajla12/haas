var express = require('express');
var router = express.Router();
var DispatcherService = require('../../services/dispatcherservice');
var MessengerService = require('../../services/messengerservice');

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
  var messageId = message.mid;
  var messageText = message.text;

  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  if (messageText) {
    var dispatcherService = new DispatcherService();

    dispatcherService.dispatch(messageText, function(messageResponse) {
      var messengerService = new MessengerService();

      console.log("Message Response: ", JSON.stringify(messageResponse));

      messageResponse.messages.forEach(function(message) {
        switch(message.type) {
          case 'Text':
            messengerService.sendTextMessage(senderID, message.text);
            break;
          case 'Image':
            messengerService.sendImageMessage(senderID, message.url);
            break;
          case 'Video':
            messengerService.sendVideoMessage(senderID, message.url);
            break;
          case 'GenericTemplate':
            messengerService.sendGenericTemplateMessage(
              senderID,
              message.titles,
              message.subtitles,
              message.urls,
              message.imageUrls
            );
            break;
          default:
            throw Error('Unknown Message Type: Unable to send message with content: \n' + message);
        }
      });
    });
  }
}

router.get('/', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.FACEBOOK_MESSENGER_VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

router.post('/', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Messenger webhook received unknown event: ", event);
        }
      });
    });

    // Must send back a 200, within 20 seconds, to let Messenger know
    // we successfully received the callback.
    res.sendStatus(200);
  }
});

module.exports = router;
