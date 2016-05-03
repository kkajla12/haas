app.controller('LoginController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.username = "";
    $scope.password = "";
    $scope.loginError = false;
    $scope.loginErrorMessage = "";

    $scope.login = function() {
        var data = {
            'username': $scope.username,
            'password': $scope.password
        }
        DataService.login(data, loginSuccess, loginFail);
    };

    loginSuccess = function(res) {
        DataService.saveUserToken(res.data.token);
        DataService.userData(function(res) {
            DataService.saveChannelId(res.data.userEnv.twilioChannelId);
            DataService.requestTwilioToken(function(res) {
                DataService.saveTwilioToken(res.data.token)
                $location.path("/haas");
                console.log(res);
            }, function (error) {
                console.log("ERROR TODO")
            });
        }, function(error) {
            console.log("ERROR TODO")
        });
    }

    loginFail = function(error) {
        $scope.loginError = true;
        $scope.loginErrorMessage = error.data.message;
    }

    $scope.register = function() {
        console.log("register")
        $location.path("/register")
    }
}]);
