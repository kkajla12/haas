var Wolfram = require('wolfram').createClient(process.env.WOLFRAM_ALPHA_APP_ID);

var WolframFactory = function(){
  return {
    query: function(request, callback) {
      Wolfram.query(request, function(err, result) {
        var response = {
          type: 'wolfram',
          partials: {
            text: '',
            urls: []
          },
          voicemsg: ''
        };

        for (var i in result) {
          if (result[i].title === "Result") {
            response.partials.text = result[i].subpods[0].value;
          }
        }

        if (response.partials.text === "") {
          response.partials.text = 'I\'m sorry, I don\'t know.\nTry this link for more information:\n';
          response.partials.urls = [{
            href: 'http://lmgtfy.com/?q=' + encodeURI(request),
            text: request
          }];
        }
        response.voicemsg = response.partials.text;

        callback(JSON.stringify(response));
      });
    }
  };
};

module.exports = WolframFactory;
