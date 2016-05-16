app.controller('SettingsController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
    $scope.settings = "";

    $scope.init = function() {
        $scope.settings = DataService.getUserEnv();
    }
}]);