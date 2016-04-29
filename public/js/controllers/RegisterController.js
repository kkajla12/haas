app.controller('RegisterController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.username = "";
    $scope.firstname = "";
    $scope.lastname = "";
    $scope.password = "";
    $scope.confirmPassword = "";

    $scope.register = function() {
        if($scope.password == $scope.confirmPassword) {
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
        console.log(res);
    }

    registerFail = function(error) {
        console.log(error)
    }
}]);
