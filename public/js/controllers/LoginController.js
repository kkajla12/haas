app.controller('LoginController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.username = "";
    $scope.password = "";
    $scope.loginError = false;
    $scope.loginErrorMessage = "";

    $scope.login = function() {
        var data = {
            'username': $scope.username,
            'password': $scope.password
        };
        DataService.login(data, loginSuccess, loginFail);
    };

    loginSuccess = function(res) {
        DataService.saveUserToken(res.data.token);
        DataService.userData(function(res) {
            DataService.saveChannelId(res.data.userEnv.twilioChannelId);
            DataService.saveUserEnv(res.data.userEnv);
            DataService.requestTwilioToken(function(res) {
                DataService.saveTwilioToken(res.data.token)
                $location.path("/haas");
            }, function (error) {
                console.log(error)
            });
        }, function(error) {
            console.log(error)
        });
    }

    loginFail = function(error) {
        $scope.loginError = true;
        $scope.loginErrorMessage = error.data.message;
    }
}]);
