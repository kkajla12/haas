app.controller('HomeController', ['$scope', '$location', 'DataService', function($scope, $location, DataService) {
	$scope.home = function() {
		$location.path('/')
	}

	$scope.loggedIn = function() {
		return DataService.loggedIn();
	}

	$scope.logout = function() {
        DataService.logout();
        $location.path('/')
    }
}]);