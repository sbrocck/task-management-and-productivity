// sensorSimulator.js
const axios = require('axios');

function simulateSensorData() {
  const value = Math.round(Math.random()); // Simulates 0 or 1 (like a switch)
  const timestamp = new Date().toISOString();

  axios.post('http://localhost:3000/api/sensor-data', {
    value,
    timestamp
  }).then(res => {
    console.log("Sensor data sent:", { value, timestamp });
  }).catch(err => {
    console.error("Failed to send simulated data:", err.message);
  });
}

// Simulate data every 3 seconds
setInterval(simulateSensorData, 3000);


