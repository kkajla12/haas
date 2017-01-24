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
        'ResponseGroup': 'OfferFull,ItemAttributes,Images'
      }).then(function(response) {
        var item = response.result.ItemSearchResponse.Items.Item[0];
        callback(null, {
          title: item.ItemAttributes.Title,
          price: item.Offers.Offer.OfferListing.Price.FormattedPrice,
          url: item.DetailPageURL,
          upc: item.ItemAttributes.UPC,
          imageUrl: item.LargeImage.URL
        });
      }).catch(function(err) {
        console.error("Something went wrong! ", err);
        callback(err);
      });
    }
  };

};

module.exports = AmazonFactory;
