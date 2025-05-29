const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// POST route to receive sensor data
router.post('/sensor-data', sensorController.receiveData);

// GET route to retrieve all sensor data
router.get('/sensor-data', sensorController.getSensorData);

module.exports = router;
