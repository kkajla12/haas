var mongoose = require('mongoose');


var UserEnvSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  travelSearchPreference: {
    kayak: {
      type: Boolean,
      default: true
    },
    expedia: {
      type: Boolean,
      default: true
    }
  },
  googleVoicePreference: {
    type: Number,
    min: 1,
    max: 4,
    default: 1
  },
  twilioChannelId: String
});

mongoose.model('UserEnv', UserEnvSchema);
