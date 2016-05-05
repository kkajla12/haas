var app = angular.module('HAAS', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
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
    })
});

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', ()=> {
        $timeout(() => {
            componentHandler.upgradeAllRegistered();
        })
    })
});
