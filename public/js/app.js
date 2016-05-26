var app = angular.module('HAAS', ['ngRoute', 'ngSanitize']);

app.directive('scroll', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watchCollection(attr.scroll, function(newVal) {
        $timeout(function() {
         element[0].scrollTop = element[0].scrollHeight;
        });
      });
    }
  }
});

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/home.html'
    });
    $routeProvider.when('/login', {
        controller: 'LoginController',
        templateUrl: '/partials/login.html'
    });
    $routeProvider.when('/haas', {
        controller: 'HaasController',
        templateUrl: '/partials/haas.html'
    });
    $routeProvider.when('/register', {
        controller: 'RegisterController',
        templateUrl: '/partials/register.html'
    });
    $routeProvider.when('/settings', {
        controller: 'SettingsController',
        templateUrl: '/partials/settings.html'
    });
});


app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', ()=> {
        $timeout(() => {
            componentHandler.upgradeAllRegistered();
        })
    })
});
