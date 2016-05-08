app.controller('HaasController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.request = "";
    $scope.twilioInitialized = false;

    var twilioToken = "";
    var channelId = "";
    var tc = {};

    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[1]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 0.9; // 0.1 to 10
    msg.pitch = 1.7; //0 to 2
    msg.lang = 'en-US';

    var twilioChannel;

    var messageWindow = document.getElementById("messages");
    var queryForm = document.getElementById("form-query");

    $scope.messages = [];

    $scope.scrollMessages = function () {
        messageWindow.scrollTop = messageWindow.scrollHeight;
    }

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
                    $scope.messages.push({'message': msg.text, 'class': 'message-bot'});
                    $scope.$apply();
                  } else {
                    queryForm.reset();
                    $scope.request = '';
                  }
                  $scope.scrollMessages();
                });
            });
        }
    }

    $scope.sendRequest = function () {
        if ($scope.request !== "" && $scope.twilioInitialized === true) {
            $scope.messages.push({'message': $scope.request, 'class': 'message-user'});
            twilioChannel.sendMessage($scope.request);
        }
    }

    $scope.logout = function() {
        DataService.logout();
        $location.path('/')
    }
}]);
