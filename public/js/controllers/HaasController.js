app.controller('HaasController', ['$scope', '$sce', '$location', 'DataService', function($scope, $sce, $location, DataService) {
    $scope.request = "";
    var savedRequest = "";
    $scope.twilioInitialized = false;
    $scope.messagesInitialized = false;

    var userEnv;

    var twilioToken = "";
    var channelId = "";
    var tc = {};

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
        msg.pitch = 1.7; //0 to 2
        msg.lang = 'en-US';
    };

    var twilioChannel;

    var messageWindow = document.getElementById("messages");
    var queryForm = document.getElementById("form-query");

    $scope.messages = [];

    // TODO: secure
    $scope.encodeAnchors = function (message) {
        return $sce.trustAsHtml(message);
    };

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
            tc.accessManager = new Twilio.AccessManager(twilioToken);
            tc.messagingClient = new Twilio.IPMessaging.Client(tc.accessManager);
            tc.messagingClient.getChannelBySid(channelId).then(function(channel) {
                channel.join().then(function(joinedChannel) {
                    twilioChannel = joinedChannel
                    if(!$scope.messagesInitialized) {
                      twilioChannel.getMessages().then(function(messages) {
                        for(var i = 0; i < messages.length; i++) {
                            if(messages[i].author == "system") {
                                var response = JSON.parse(messages[i].body);
                                $scope.messages.push({'message': response.msg, 'class': 'message-bot'});
                            }
                            else {
                                $scope.messages.push({'message': messages[i].body, 'class': 'message-user'});
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

                  if (msg.text !== savedRequest) {
                    var response = JSON.parse(msg.text);

                    $scope.messages.pop();
                    $scope.messages.push({'message': response.msg, 'class': 'message-bot'});
                    //DataService.saveMessages($scope.messages);

                    msg.text = response.voicemsg;

                    window.speechSynthesis.speak(msg);
                  }
                  $scope.$apply();
                });
            });
        }
    }

    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
      $scope.request = event.results[0][0].transcript;
      $scope.sendRequest();
    }

    $scope.recognizeVoice = function () {
        recognition.start();
    };

    $scope.sendRequest = function () {
        if ($scope.request !== "" && $scope.twilioInitialized === true) {
            $scope.messages.push({'message': $scope.request, 'class': 'message-user'});
            $scope.messages.push({'message': "...", 'class': 'message-bot'});
            savedRequest = $scope.request;
            $scope.request = "";

            twilioChannel.sendMessage(savedRequest);
        }
    }
}]);
