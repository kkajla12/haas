var getJSON = require('./jsonservice');

var Food2ForkFactory = function(){

  var getRecipes = function(item, callback) {
    var url = 'http://food2fork.com/api/search';
    var options = {
      key: process.env.FOOD2FORK_API_KEY,
      q: item
    };
    getJSON(url, options, function(err, res) {
      if (err) { return callback(err); }
      callback(null, JSON.parse(res));
    });
  };

  var formatRecipeData = function(data) {
    var result = [];
    var count = 0;
    for (var i in data.recipes) {
      if (count >= 5) break;
      count++;
      result.push({
        title: data.recipes[i].title,
        url: data.recipes[i].source_url
      });
    }
    return result;
  };

  return {

    recipeQuery: function(item, callback) {
      getRecipes(item, function(err, res) {
        if (err) { return callback(err); }
        callback(null, formatRecipeData(res));
      });
    },

    recipeIngredientQuery: function(items, callback) {
      getRecipes(items.join(), function(err, res) {
        if (err) { return callback(err); }
        callback(null, formatRecipeData(res));
      });
    }

  };

};

module.exports = Food2ForkFactory;
