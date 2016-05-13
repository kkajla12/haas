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

        getUserEnv: function() {
            return JSON.parse($window.localStorage['user-env']);
        },

        saveUserEnv: function(env) {
            $window.localStorage.setItem('user-env', JSON.stringify(env));
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
            $window.localStorage.removeItem('channel-id');
            $window.localStorage.removeItem('user-env');
        },

        loggedIn: function() {
            if($window.localStorage['haas-token'] && $window.localStorage['twilio-token'] && $window.localStorage['channel-id']) {
                return true;
            }
            return false;
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
