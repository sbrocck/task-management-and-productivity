const SensorData = require('../models/sensorData');

// Controller to handle incoming sensor data (POST)
exports.receiveData = async (req, res) => {
  try {
    const { value, timestamp } = req.body;

    // ✅ Validate input
    if (value === undefined || !timestamp) {
      return res.status(400).json({ error: "Value and timestamp are required" });
    }

    const data = new SensorData({ value, timestamp });
    await data.save();
    res.status(201).json({ message: 'Sensor data saved' });
  } catch (error) {
    res.status(500).json({ error: "Failed to save sensor data", details: error.message });
  }
};

// Controller to retrieve sensor data (GET)
exports.getSensorData = async (req, res) => {
  try {
    // 🔧 Optional: filter by date range if needed
    // const { start, end } = req.query;
    // const filter = start && end ? {
    //   timestamp: { $gte: new Date(start), $lte: new Date(end) }
    // } : {};

    const data = await SensorData.find(); // Or use .find(filter) if filtering
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve sensor data", details: error.message });
  }
};
