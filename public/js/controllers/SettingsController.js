app.controller('SettingsController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.settings = "";
    $scope.voices = [
        {
            id: 0,          // TODO: allow for this in the DB
            name: "Mute"
        },
        {
            id: 1,
            name: "Google US English" // EN US Male
        },
        {
            id: 2,
            name: "Samantha" // EN US Female
        },
        {
            id: 3,
            name: "Google UK English Male" // EN GB Male
        },
        {
            id: 4,
            name: "Google UK English Female" // EN GB Female
        }
    ];

    $scope.init = function() {
        $scope.settings = DataService.getUserEnv();
        $scope.googleVoicePreference = $scope.voices[$scope.settings.googleVoicePreference];
        $scope.expedia = $scope.settings.travelSearchPreference.expedia;
        $scope.kayak = $scope.settings.travelSearchPreference.kayak;
    };

    $scope.saveSettings = function () {
        if ($scope.googleVoicePreference.id !== $scope.settings.googleVoicePreference
            || $scope.expedia !== $scope.settings.travelSearchPreference.expedia
            || $scope.kayak !== $scope.settings.travelSearchPreference.kayak)
        {
            var settings = {
                googleVoicePreference: $scope.googleVoicePreference.id,
                travelSearchPreference: {
                    expedia: $scope.expedia,
                    kayak: $scope.kayak
                }
            };
            // TODO: update
        }
    };
}]);
