app.factory('DataService', ['APIPromiseService', '$window', function(APIPromiseService, $window) {
    var userToken = "";

    return {
        getUserToken: function() {
            return $window.localStorage['haas-token'];
        },

        saveUserToken: function(token) {
            $window.localStorage['haas-token'] = token;
        },

        getTwilioToken: function() {
            return $window.localStorage['twilio-token'];
        },

        saveTwilioToken: function(token) {
            $window.localStorage['twilio-token'] = token;
        },

        getChannelId: function() {
            return $window.localStorage['channel-id'];
        },

        saveChannelId: function(channelId) {
            $window.localStorage['channel-id'] = channelId;
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
            $window.localStorage.removeItem('twilio-token');
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

        requestTwilioToken: function(successCallback, failCallback) {
            APIPromiseService.requestTwilioToken($window.localStorage['haas-token'])
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
