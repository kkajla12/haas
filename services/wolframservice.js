var Wolfram = require('wolfram').createClient(process.env.WOLFRAM_ALPHA_APP_ID);

var WolframFactory = function(){
  return {
    query: function(request, callback) {
      Wolfram.query(request, function(err, result) {
        var response = {
          msg: '',
          voicemsg: ''
        };

        for (var i in result) {
          if (result[i].title === "Result") {
            response.msg = result[i].subpods[0].value;
            response.voicemsg = response.msg;
          }
        }

        if (response.msg === "") {
          response.msg = 'I\'m sorry, I don\'t know. Try this link for more information:\n';
          response.msg += '<a href="';
          response.msg += 'http://lmgtfy.com/?q=' + encodeURI(request);
          response.msg += '" style=\'color:white\' target=\'_blank\'>'; // TODO: css class
          response.msg += request;
          response.msg += '</a>';
          response.voicemsg = 'I\'m sorry, I don\'t know.';
        }

        callback(JSON.stringify(response));
      });
    }
  };
};

module.exports = WolframFactory;
