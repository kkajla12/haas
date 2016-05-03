app.controller('HaasController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.request = "What basketball team does Kobe Bryant play for?";
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

    $scope.messages = [];

    $scope.init = function() {
        twilioToken = DataService.getTwilioToken();
        channelId = DataService.getChannelId();
        tc.accessManager = new Twilio.AccessManager(twilioToken);
        tc.messagingClient = new Twilio.IPMessaging.Client(tc.accessManager);
        tc.messagingClient.getChannelBySid(channelId).then(function(channel) {
            channel.join().then(function(joinedChannel) {
              console.log('Joined channel ' + joinedChannel.friendlyName);
              twilioChannel = joinedChannel
              $scope.twilioInitialized = true;
              $scope.$apply();
            });
            channel.on('messageAdded', function(message) {
              msg.text = message.body;
              if(msg.text != $scope.request) {
                $scope.messages.push({'message': msg.text, 'class': 'message-bot'});
                $scope.$apply();
              }
              console.log($scope.messages);
            });
        });
    }

    $scope.query = function () {
        $scope.messages.push({'message': $scope.request, 'class': 'message-user'});
        twilioChannel.sendMessage($scope.request);
    }

    querySuccess = function(res) {
        $scope.botAnswer = res;
    }

    queryFail = function(error) {
        $scope.botAnswer = error;
    }
}]);
