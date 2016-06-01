app.controller('HaasController', ['$scope', '$sce', '$location', 'DataService', function($scope, $sce, $location, DataService) {
    $scope.request = "";
    var savedRequest = "";
    $scope.twilioInitialized = false;
    $scope.messagesInitialized = false;
    $scope.listening = false;

    var userEnv = DataService.getUserEnv();

    var twilioToken = "";
    var twilioChannel;
    var channelId = "";
    var tc = {};

    $scope.messages = [];
    //var prevMessages = [];
    //var prevPosition;

    var msg = new SpeechSynthesisUtterance();
    window.speechSynthesis.onvoiceschanged = function() {
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1]; // Note: some voices don't support altering params

        for (var voice in voices) {
            if (voices[voice].name === userEnv.googleVoicePreference.name) {
                msg.voice = voices[voice];
                break;
            }
        }

        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 0.9; // 0.1 to 10
        msg.pitch = 1.0; //0 to 2
        msg.lang = 'en-US';
    };

    var messageWindow = document.getElementById("messages");
    var queryForm = document.getElementById("form-query");

    function createAnchor(href, text) {
      var anchor = '';
      anchor += '<a href="';
      anchor += href;
      anchor += '" style=\'color:black\' target=\'_blank\'>';
      anchor += text;
      anchor += "</a>";
      return anchor;
    }

    function encodeLink(link) {
      var text = '<div class="message-link">';
      text += '<p class="message-link-text">'
              + link.text + '</p>';
      if (link.majorInfo.length > 0) {
          text += '<hr><p class="message-link-major">' + link.majorInfo
                  + '</p>';
      }
      if (link.minorInfo.length > 0) {
          text += '<p class="message-link-minor">' + link.minorInfo + '</p>';
      }
      text += '</div>';
      return createAnchor(link.url, text);
    };

    // used to properly display typing indicator
    var nExpectedResponses = 0;

    var typingIndicator = '<div class="typing-indicator">' +
                          '<span></span><span></span><span></span>' +
                          '</div>';

    // TODO: secure
    $scope.encodeAnchors = function (message) {
      return $sce.trustAsHtml(message);
    };

    function initTwilio (tc) {
      tc.messagingClient.getChannelBySid(channelId).then(function(channel) {
        channel.join().then(function(joinedChannel) {
          twilioChannel = joinedChannel;
          if(!$scope.messagesInitialized) {
            twilioChannel.getMessages().then(function(messages) {
              for(var i in messages) {
                if(messages[i].author === "system") {
                  var response = JSON.parse(messages[i].body);
                  $scope.messages.push({
                    'message': response.msg,
                    'class': 'message-bot'
                  });

                  for(var j in response.links) {
                    $scope.messages.push({
                      'message': encodeLink(response.links[j]),
                      'class': 'message-bot'
                    });
                  }
                }
                else {
                  $scope.messages.push({
                    'message': messages[i].body,
                    'class': 'message-user'
                  });
                }
              }
              $scope.messagesInitialized = true;
              //DataService.saveMessages($scope.messages);
              $scope.$apply();
            });
          }
          $scope.twilioInitialized = true;
          $scope.$apply();
        });
        channel.on('messageAdded', function(message) {
          msg.text = message.body;

          if (message.author === "system") {
            nExpectedResponses--;
            var response = JSON.parse(msg.text);

            // pop typing indicator
            $scope.messages.pop();

            $scope.messages.push({'message': response.msg, 'class': 'message-bot'});
            for(var i in response.links) {
              $scope.messages.push({
                'message': encodeLink(response.links[i]),
                'class': 'message-bot'
              });
            }
            //DataService.saveMessages($scope.messages);

            if (nExpectedResponses > 0) {
              // push typing indicator since we're still waiting for messages
              $scope.messages.push({
                'message': typingIndicator,
                'class': 'message-bot message-typing-indicator'
              });
            }

            msg.text = response.voicemsg;

            if (userEnv.googleVoicePreference !== 0) {
              window.speechSynthesis.speak(msg);
            }
          }
          $scope.$apply();
        });
      });
      tc.messagingClient.on('tokenExpired', function() {
        DataService.requestTwilioToken(function (res) {
          DataService.saveTwilioToken(res.data.token);
          twilioToken = DataService.getTwilioToken();
          tc.accessManager = new Twilio.AccessManager(twilioToken);
          tc.messagingClient = new Twilio.IPMessaging.Client(tc.accessManager);
          initTwilio(tc);
        });
      });
    }

    $scope.init = function() {
     if(!DataService.loggedIn()) {
          $location.path('/');
      }
      else {
        userEnv = DataService.getUserEnv();
        twilioToken = DataService.getTwilioToken();
        channelId = DataService.getChannelId();
        /*$scope.messages = DataService.getMessages();
        if($scope.messages.length != 0) {
            $scope.messagesInitialized = true;
        }*/
        try { // in case twilioToken is already expired
          tc.accessManager = new Twilio.AccessManager(twilioToken);
          tc.messagingClient = new Twilio.IPMessaging.Client(tc.accessManager);
          initTwilio(tc);
        } catch (err) {
          DataService.requestTwilioToken(function (res) {
            DataService.saveTwilioToken(res.data.token);
            twilioToken = DataService.getTwilioToken();
            tc.accessManager = new Twilio.AccessManager(twilioToken);
            tc.messagingClient = new Twilio.IPMessaging.Client(tc.accessManager);
            initTwilio(tc);
          });
        }
      }
    }

///Batching old messages code.

/*    $("#messages").scroll(function() {
        var messageWindow = $("#messages");
        if(messageWindow[0].scrollTop == 0) {
            addMessages();
        }
    })

    addMessages = function() {
        for(var i = prevPosition; i > prevPosition - 20; i--) {
            if(i == -1) {
                prevPosition = -1;
                $scope.$apply();
                return;
            }
            $scope.messages.unshift(prevMessages[i]);
        }
        $scope.$apply();
        setTimeout(function() {$("#messages")[0].scrollTop += 43.45 * 20; console.log("hello")},0);
        prevPosition -= 20;
    }
*/
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
      $scope.listening = false;
      $scope.request = event.results[0][0].transcript;
      $scope.sendRequest();
    }

    recognition.onend = function(event) {
      $scope.$apply(function() {
        $scope.listening = false;
      });
    }

    recognition.onstart = function(event) {
      $scope.$apply(function() {
        $scope.listening = true;
      });
    }

    $scope.recognizeVoice = function () {
        recognition.start();
    };

    $scope.sendRequest = function () {
        if ($scope.request !== "" && $scope.twilioInitialized === true) {
            if (nExpectedResponses > 0) {
                // pop typing indicator
                $scope.messages.pop();
            }
            $scope.messages.push({'message': $scope.request, 'class': 'message-user'});
            nExpectedResponses++;
            $scope.messages.push({
                'message': typingIndicator,
                'class': 'message-bot message-typing-indicator'
            });
            savedRequest = $scope.request;
            $scope.request = "";

            twilioChannel.sendMessage(savedRequest);
        }
    }
}]);
