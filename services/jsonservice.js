var http = require("http");

module.exports = function(host, options, callback) {

  var endpoint = host + '?';
  var prefix = '';
  for (var key in options) {
    if (options[key] !== undefined) {
      endpoint += prefix + key + '=' + encodeURIComponent(options[key]);
      prefix = '&';
    }
  }

  http.get(endpoint, function(res) {
    // console.log('GET: ' + res.statusCode);
    // console.log(endpoint);
    var message = '';

    res.on('data', function(chunk) {
      message += chunk;
    });

    res.on('end', function() {
      if (message === '') { message = '{}'; }
      callback(null, message);
    });

  }).on('error', function(err) {
    callback(err.message);
  });

};
