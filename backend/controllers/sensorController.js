const SensorData = require('../models/sensorData');

// Controller to handle incoming sensor data (POST)
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

// Optional: Controller to retrieve sensor data (GET)
exports.getSensorData = async (req, res) => {
  try {
    const data = await SensorData.find();  // Retrieve all sensor data from the database
    res.status(200).json(data);  // Send the data as the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
