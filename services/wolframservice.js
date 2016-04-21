var Wolfram = require('wolfram').createClient(process.env.WOLFRAM_ALPHA_APP_ID);

var WolframFactory = function(){
  return {
    query: function(request, callback) {
      Wolfram.query(request, function(err, result) {
        var response = "";
        for (var i in result) {
          if (result[i].title === "Result") {
            response = result[i].subpods[0].value;
          }
        }
        if (response === "") {
          response = "I'm sorry, I dont know.\n" + 
                    "Try this link for more information.\n" + 
                    "http://lmgtfy.com/?q=" + encodeURI(request);
        }
        callback(response);
      });
    }
  };
};

module.exports = WolframFactory;
