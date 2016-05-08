app.controller('RegisterController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.username = "";
    $scope.firstname = "";
    $scope.lastname = "";
    $scope.password = "";
    $scope.confirmPassword = "";
    $scope.registerErrorMessage = "";
    $scope.registerError = false;

    $scope.register = function() {
        if($scope.username !== "" && $scope.firstname !== ""
            && $scope.lastname !== "" && $scope.password !== ""
            && $scope.confirmPasword !== ""
            && $scope.password === $scope.confirmPassword)
        {
            var data = {
                'username': $scope.username,
                'firstname': $scope.firstname,
                'lastname': $scope.lastname,
                'password': $scope.password
            }
            DataService.register(data, registerSuccess, registerFail);
        }
    }

    registerSuccess = function(res) {
        DataService.saveUserToken(res.data.token);
        DataService.userData(function(res) {
            DataService.saveChannelId(res.data.userEnv.twilioChannelId);
            DataService.requestTwilioToken(function(res) {
                DataService.saveTwilioToken(res.data.token)
                $location.path("/haas");
            }, function (error) {
                console.log("ERROR TODO")
            });
        }, function(error) {
            console.log("ERROR TODO")
        });
    }

    registerFail = function(error) {
        $scope.registerErrorMessage = error.data.message;
        $scope.registerError = true;
    }
}]);
