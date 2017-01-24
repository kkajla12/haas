var WolframClient = require('node-wolfram');
var Wolfram = new WolframClient(process.env.WOLFRAM_ALPHA_APP_ID);

var WolframFactory = function(){
  return {
    query: function(request, callback) {
      Wolfram.query(request, function(err, result) {
        var response = {
          messages: []
        };

        for (var i in result) {
          if (result[i].title === "Result") {
            response.messages.push({
              type: 'Text',
              text: result[i].subpods[0].value
            });
          }
        }

        if (response.messages.length === 0) {
          response.messages.push(
            {
              type: 'Text',
              text: "I'm not exactly sure what you mean. You can try rephrasing, or if not, here's a Google search that might help."
            },
            {
              type: 'Text',
              text: 'https://google.com/search?q=' + encodeURI(request)
            }
          );
        }

        callback(response);
      });
    }
  };
};

module.exports = WolframFactory;
