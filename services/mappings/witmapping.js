// Dictionary mapping each specific intent to a function which
// retrieves the appropriate fields from the Wit JSON response
// that will be returned.
// NOTE: Need to add error handling to prevent server from crashing
// when response object does not contain the expected properties.

module.exports = {

  retailStoreSearch: function(data) {
    return {
      intent: 'retailStoreSearch',
      item: data.outcomes[0].entities.item[0].value
    };
  },

  retailComparisonSearch: function(data) {
    return {
      intent: 'retailComparisonSearch',
      item: data.outcomes[0].entities.item[0].value
    };
  },

  generalFlightSearch: function(data) {
    return {
      intent: 'generalFlightSearch',
      location_from: data.outcomes[0].entities.from[0].value.toUpperCase(),
      location_to: data.outcomes[0].entities.to[0].value.toUpperCase(),
      datetime: data.outcomes[0].entities.datetime[0].value
    };
  },

  generalHotelSearch: function(data) {
    return {
      intent: 'generalHotelSearch'
    };
  },

  recipeSearch: function(data) {
    return {
      intent: 'recipeSearch',
      item: data.outcomes[0].entities.item[0].value
    };
  },

  recipeIngredientSearch: function(data) {
    return {
      intent: 'recipeIngredientSearch',
      items: data.outcomes[0].entities.item.map(i => i.value)
    };
  }

}
