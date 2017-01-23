var getJSON = require('./jsonservice');

var ConnexityFactory = function(){

  var getProducts = function(title, callback) {
    var url = 'http://catalog.bizrate.com/services/catalog/v1/us/product';
    var options = {
      publisherId: process.env.CONNEXITY_PUBLISHER_ID,
      apiKey: process.env.CONNEXITY_API_KEY,
      sort: 'relevancy_desc',
      keyword: title,
      format: 'json'
    };

    getJSON(url, options, function(err, res) {
      if (err) { return callback(err); }
      var result = JSON.parse(res);

      var products = [];
      var merchantNames = [];
      var count = 0;
      for(var i in result.products.product) {
        var product = result.products.product[i];
        if(count >= 5) {
          break;
        }
        if(merchantNames.indexOf(product.merchantName) !== -1) {
          continue;
        }
        if(product.price) {
          products.push({
            title: product.title,
            price: product.price.value,
            url: product.url.value,
            merchantName: product.merchantName,
            imageUrl: product.images.image[3].value
          });
        } else {
          try {
            products.push({
              title: product.title,
              price: product.priceSet.minPrice.value,
              url: product.url.value,
              merchantName: product.brand.name,
              imageUrl: product.images.image[3].value
            });
          } catch (e) {
            console.log("unable to add product to result list due to poorly"
              + "formatted response object");
          }
        }
        merchantNames.push(product.merchantName);
        count++;
      }

      callback(null, products);
    });
  };

  return {

    retailQuery: function(title, callback) {
      getProducts(title, function(err, res) {
        if (err) { return callback(err); }
        callback(null, res);
      });
    },

    retailComparisonQuery: function(request, callback) {
      callback('not implemented');
    }

  };

};

module.exports = ConnexityFactory;
