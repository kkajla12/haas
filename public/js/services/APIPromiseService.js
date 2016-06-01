app.factory('APIPromiseService', [ '$http', function($http) {
    //API CALLS
    function requestPromise(endpoint, method, data) {
        var req = {
            method: method,
            url: endpoint
        }
        if(method == "POST") {
            req.data = data
        }
        return $http(req);
    }

    function requestUserPromise(token) {
        var req = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            },
            url: 'user'
        }
        return $http(req);
    }

    function requestTwilioTokenPromise(token) {
        var req = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            url: 'twilio/token'
        }
        return $http(req);
    }

    function updateUserEnvPromise (token, data) {
        var req = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: data,
            url: 'user'
        };
        return $http(req);
    }

    return {
        register: function(data) {
            return requestPromise("register", "POST", data);
        },
        login: function(data) {
            return requestPromise("login", "POST", data);
        },
        userData: function(token) {
            return requestUserPromise(token)
        },
        requestTwilioToken: function(token) {
            return requestTwilioTokenPromise(token);
        },
        updateUserEnv: function (token, data) {
            return updateUserEnvPromise(token, data);
        }
    }
}]);
