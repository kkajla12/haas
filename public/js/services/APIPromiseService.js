app.factory('APIPromiseService', [ '$http', function($http) {
    var SERVER_URL = "http://localhost:3000/";

    //API CALLS
    function requestPromise(endpoint, method, data) {
        var req = {
            method: method,
            url: SERVER_URL + endpoint
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
            url: SERVER_URL + 'user'
        }
        return $http(req);
    }

/*  function requestLoginPromise(data) {
        var req = {
            method: 'GET',
            url: SERVER_URL + "/login",
            data: data
        }
        return $http(req)
    }

    function requestRegisterPromise(data) {
        var req = {
            method: 'POST',
            url: SERVER_URL + "/register",
            data: data
        }
        return $http(req);
    }

    function requestQueryPromise(query, url) {
        var req = {
            method: 'GET',
            url: url
        }
        return $http(req);
        return 0;
    }*/

    return {
/*      askBot : function(query) {
            var url = "";
            return requestQueryPromise(query, url);
        },*/
        register: function(data) {
            return requestPromise("register", "POST", data);
        },
        login: function(data) {
            return requestPromise("login", "POST", data);
        },
        userData: function(token) {
            return requestUserPromise(token)
        }

    }
}]);
