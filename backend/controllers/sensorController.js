const SensorData = require('../models/sensorData'); // Assuming you have a SensorData model

exports.receiveSensorData = async (req, res) => {
  const { value, timestamp } = req.body;

  try {
    const newSensorData = new SensorData({ value, timestamp });
    await newSensorData.save();
    res.status(201).json(newSensorData); // Respond with the newly saved data
  } catch (error) {
    res.status(500).json({ message: 'Error saving sensor data', error });
  }
};
