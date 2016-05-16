app.controller('HaasController', ['$scope', '$sce', '$location', 'DataService', function($scope, $sce, $location, DataService) {
    $scope.request = "";
    $scope.twilioInitialized = false;

    var twilioToken = "";
    var channelId = "";
    var tc = {};

    var msg = new SpeechSynthesisUtterance();
    window.speechSynthesis.onvoiceschanged = function() {
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1]; // Note: some voices don't support altering params
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

    $scope.scrollMessages = function () {
        messageWindow.scrollTop = messageWindow.scrollHeight;
    }

    // TODO: secure
    $scope.encodeAnchors = function (message) {
        return $sce.trustAsHtml(message);
    };

    $scope.init = function() {
       if(!DataService.loggedIn()) {
            $location.path('/');
        }
        else {
            twilioToken = DataService.getTwilioToken();
            channelId = DataService.getChannelId();
            tc.accessManager = new Twilio.AccessManager(twilioToken);
            tc.messagingClient = new Twilio.IPMessaging.Client(tc.accessManager);
            tc.messagingClient.getChannelBySid(channelId).then(function(channel) {
                channel.join().then(function(joinedChannel) {
                  twilioChannel = joinedChannel
                  $scope.twilioInitialized = true;
                  $scope.$apply();
                });
                channel.on('messageAdded', function(message) {
                  msg.text = message.body;

                  if (msg.text !== $scope.request) {
                    var response = JSON.parse(msg.text);

                    $scope.messages.push({'message': response.msg, 'class': 'message-bot'});
                    $scope.$apply();

                    msg.text = response.voicemsg;
                    window.speechSynthesis.speak(msg);
                  } else {
                    $scope.request = '';
                    $scope.$apply();
                  }
                  $scope.scrollMessages();
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
            twilioChannel.sendMessage($scope.request);
        }
    }

    $scope.settings = function() {
        $location.path('/settings')
    }

    $scope.logout = function() {
        DataService.logout();
        $location.path('/')
    }
}]);
