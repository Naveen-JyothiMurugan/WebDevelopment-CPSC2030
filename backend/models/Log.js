// Log schema here

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  method: String,
  url: String,
  headers: Object,
  body: Object,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Log', logSchema);
