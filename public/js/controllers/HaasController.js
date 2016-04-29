app.controller('HaasController', ['$scope', 'DataService', function($scope, DataService) {
    $scope.botAnswer = "";
    $scope.botQuestion = "";

    $scope.query = function () {
        DataService.askBot($scope.botQuestion, querySuccess, queryFail);
    }

    querySuccess = function(res) {
        $scope.botAnswer = res;
    }

    queryFail = function(error) {
        $scope.botAnswer = error;
    }
}]);
