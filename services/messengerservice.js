var request = require('request');

var MessengerFactory = function() {
  var sendMessage = function(messageData) {
    console.log("Sending message with following data: ", messageData);
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
      } else {
        console.error("Unable to send message.");
        console.error(response);
        console.error(error);
      }
    });
  };

  var textMessageData = function(recipientId, messageText) {
    return {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    };
  };

  var videoMessageData = function(recipientId, videoUrl) {
    return {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'video',
          payload: {
            url: videoUrl
          }
        }
      }
    };
  };

  var imageMessageData = function(recipientId, imageUrl) {
    return {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'image',
          payload: {
            url: imageUrl
          }
        }
      }
    };
  };

  var genericTemplateMessageData = function(recipientId, titles, subtitles, urls, imageUrls) {
    var elements = [];
    titles.forEach(function(e, index) {
      var element = {
        title: e,
        default_action: {
          type: 'web_url',
          url: urls[index]
        }
      };

      if (subtitles[index]) element.subtitle = subtitles[index];
      if (imageUrls[index]) element.image_url = imageUrls[index];

      elements.push(element);
    });

    return {
      recipient:  {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: elements
          }
        }
      }
    };
  }

  return {
    sendTextMessage: function(recipientId, messageText) {
      var textMessage = textMessageData(recipientId, messageText);

      sendMessage(textMessage);
    },

    sendImageMessage: function(recipientId, imageUrl) {
      var textMessage = textMessageData(recipientId, imageUrl);
      var imageMessage = imageMessageData(recipientId, imageUrl);

      sendMessage(textMessage);
      sendMessage(imageMessage);
    },

    sendVideoMessage: function(recipientId, videoUrl) {
      var textMessage = textMessageData(recipientId, videoUrl);
      var videoMessage = videoMessageData(recipientId, videoUrl);

      sendMessage(textMessage);
      sendMessage(videoMessage);
    },

    sendGenericTemplateMessage: function(recipientId, titles, subtitles, urls, imageUrls) {
      var genericTemplateMessage = genericTemplateMessageData(recipientId, titles, subtitles, urls, imageUrls);

      sendMessage(genericTemplateMessage);
    }
  };
};

module.exports = MessengerFactory;
