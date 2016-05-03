app.controller('HaasController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.request = "What basketball team does Kobe Bryant play for?";

    var twilioToken = "";
    var channelId = "";
    var tc = {};

    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[16]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 0.9; // 0.1 to 10
    msg.pitch = 1.7; //0 to 2
    msg.lang = 'en-US';

    $scope.init = function() {
        twilioToken = DataService.getTwilioToken();
        channelId = DataService.getChannelId();
        console.log(twilioToken);
        console.log(channelId);
        tc.accessManager = new Twilio.AccessManager(twilioToken);
        tc.messagingClient = new Twilio.IPMessaging.Client(tc.accessManager);
    }

    $scope.query = function () {
        tc.messagingClient.getChannelBySid(channelId).then(function(channel) {
            channel.join().then(function(joinedChannel) {
              console.log('Joined channel ' + joinedChannel.friendlyName);
              joinedChannel.sendMessage($scope.request);
            });
            channel.on('messageAdded', function(message) {
              msg.text = message.body;
              console.log(msg)
            });
        });
    }

    querySuccess = function(res) {
        $scope.botAnswer = res;
    }

    queryFail = function(error) {
        $scope.botAnswer = error;
    }
}]);
