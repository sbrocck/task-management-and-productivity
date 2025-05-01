const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);
module.exports = SensorData;
