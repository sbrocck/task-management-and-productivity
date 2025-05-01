const SensorData = require('../models/sensorData');  // Import the model

// Function to handle sensor data
exports.receiveSensorData = async (req, res) => {
  const { value, timestamp } = req.body;  // Destructure the incoming data

  try {
    // Create a new SensorData instance
    const newSensorData = new SensorData({
      value,
      timestamp
    });

    // Save to MongoDB
    await newSensorData.save();

    // Respond back with a success message
    res.status(201).json({ message: 'Sensor data received and saved!', data: newSensorData });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res.status(500).json({ message: "Error saving sensor data", error });
  }
};
