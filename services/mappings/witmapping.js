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

  twitterTweet: function(data) {
    return {
      intent: 'twitterTweet',
      tweet: data.outcomes[0].entities.message_body[0].value
    };
  },

  facebookPostStatus: function(data) {
    return {
      intent: 'facebookPostStatus',
      fb_status: data.outcomes[0].entities.message_body[0].value
    };
  },

  generalFlightSearch: function(data) {
    return {
      intent: 'generalFlightSearch',
      location_from: data.outcomes[0].entities.from[0].value,
      location_to: data.outcomes[0].entities.to[0].value,
      datetime: data.outcomes[0].entities.datetime[0].value
    };
  }

}
