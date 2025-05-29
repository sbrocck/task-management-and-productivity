const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  value: Number,
  timestamp: { type: Date, default: Date.now },
  sensorId: String,
  sensorType: String
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
