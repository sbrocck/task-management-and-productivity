const SensorData = require('../models/sensorData');

exports.receiveData = async (req, res) => {
  try {
    const { value, timestamp } = req.body;
    const data = new SensorData({ value, timestamp });
    await data.save();
    res.status(201).json({ message: 'Sensor data saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
