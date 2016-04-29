app.factory('DataService', ['APIPromiseService', '$window', function(APIPromiseService, $window) {
    var userToken = "";

    return {
        getToken: function() {
            return $window.localStorage['haas-token'];
        },

        saveToken: function(token) {
            $window.localStorage['haas-token'] = token;
        },

        login: function(data, successCallback, failCallback) {
            APIPromiseService.login(data)
            .then(function(res) {
                successCallback(res);
            }, function(error) {
                failCallback(error)
            })
        },

        logout: function() {
            $window.localStorage.removeItem('haas-token');
        },

        register: function(data, successCallback, failCallback) {
            APIPromiseService.register(data)
            .then(function(res) {
                successCallback(res);
            }, function(error) {
                failCallback(error);
            })
        },

        userData: function(successCallback, failCallback) {
            APIPromiseService.userData($window.localStorage['haas-token'])
            .then(function(res) {
                successCallback(res)
            }, function(error) {
                failCallback(error)
            })
        },

        askBot: function(query, successCallback, failCallback) {
            APIPromiseService.askBot(query)
            .then(function(res) {

            }, function(error) {

            })
        }
    }
}]);
