const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// This function will be used to access the Socket.IO instance later
let io;

const setSocketIo = (socketIoInstance) => {
  io = socketIoInstance;
};

// POST /api/sensor-data
router.post('/sensor-data', async (req, res) => {
  try {
    const { value, timestamp, sensorId, sensorType } = req.body;

    const sensorData = new SensorData({
      value,
      timestamp,
      sensorId,
      sensorType
    });

    const savedData = await sensorData.save();

    // Emit real-time update to all connected clients
    if (io) {
      io.emit('sensorDataUpdate', savedData);
    }

    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error saving sensor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { router, setSocketIo };
