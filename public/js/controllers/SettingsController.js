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
        var updatedUserEnv = {};
        var userEnvDidUpdate = false;

        if ($scope.googleVoicePreference.id !== $scope.settings.googleVoicePreference) {
            userEnvDidUpdate = true;
            updatedUserEnv.googleVoicePreference = $scope.googleVoicePreference.id;
        }

        if ($scope.expedia !== $scope.settings.travelSearchPreference.expedia
            || $scope.kayak !== $scope.settings.travelSearchPreference.kayak)
        {
            userEnvDidUpdate = true;
            updatedUserEnv.travelSearchPreference = {
                expedia: $scope.expedia,
                kayak: $scope.kayak
            };
        }

        if (userEnvDidUpdate) {
            updatedUserEnv.user = $scope.settings.user;
            DataService.updateUserEnv(updatedUserEnv, function (res) {
                DataService.saveUserEnv(res.data.userEnv);
                $scope.init();
            }, function (error) {
                console.log(error);
            });
        }
    };
}]);
