const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now // Optional: auto-set timestamp if not provided
  }
});

// Optional: Add an index for faster queries by timestamp
SensorDataSchema.index({ timestamp: -1 });

const SensorData = mongoose.model('SensorData', SensorDataSchema);
module.exports = SensorData;
