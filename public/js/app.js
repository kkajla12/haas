var app = angular.module('HAAS', ['ngRoute', 'ngSanitize']);

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
