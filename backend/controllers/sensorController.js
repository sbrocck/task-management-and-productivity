const SensorData = require('../models/sensorData');  // Import the model to save sensor data

// Controller function to handle sensor data
exports.receiveSensorData = async (req, res) => {
  const { value, timestamp } = req.body; // Extract data from the request body

  try {
    const newSensorData = new SensorData({ value, timestamp });  // Create a new instance of SensorData
    await newSensorData.save();  // Save to the database
    res.status(201).json(newSensorData);  // Respond with the saved data
  } catch (error) {
    res.status(500).json({ message: 'Error saving sensor data', error });
  }
};
