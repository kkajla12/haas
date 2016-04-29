app.controller('LoginController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.username = "";
    $scope.password = "";
    $scope.loginError = false;
    $scope.loginErrorMessage = "";

    $scope.init = function() {

    }

    $scope.login = function() {
        var data = {
            'username': $scope.username,
            'password': $scope.password
        }
        DataService.login(data, loginSuccess, loginFail);
    };

    loginSuccess = function(res) {
        DataService.saveToken(res.data.token);
        DataService.userData(function(res) {
            console.log(res);
        }, function(error) {
            console.log(error);
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
