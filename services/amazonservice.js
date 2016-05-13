var util = require('util'),
    OperationHelper = require('apac').OperationHelper;

var AmazonFactory = function(){
  var opHelper = new OperationHelper({
      awsId:     process.env.AMAZON_ACCESS_KEY_ID,
      awsSecret: process.env.AMAZON_SECRET_ACCESS_KEY,
      assocId:   process.env.AMAZON_ASSOCIATE_ID
  });

  return {
    search: function(keywords, callback) {
      opHelper.execute('ItemSearch', {
        'SearchIndex': 'All',
        'Keywords': keywords,
        'ResponseGroup': 'ItemAttributes'
      }).then((response) => {
          console.log("Results: ", response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.ListPrice.FormattedPrice);
          callback(null, response.result.ItemSearchResponse.Items.Item[0].ItemAttributes.ListPrice.FormattedPrice);
      }).catch((err) => {
          console.error("Something went wrong! ", err);
          callback(err);
      });
    }
  };

};

module.exports = AmazonFactory;
