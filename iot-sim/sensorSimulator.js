const axios = require('axios');

function simulateSensorData() {
  const value = Math.floor(Math.random() * 100); // Simulate a random value between 0 and 100
  const timestamp = new Date().toISOString();
  const sensorId = 'sensor-' + Math.floor(Math.random() * 1000);
  const sensorType = 'temperature'; // Example of sensor type

  axios.post('http://localhost:3000/api/sensor-data', {
    value,
    timestamp,
    sensorId,
    sensorType
  }, {
    headers: {
      'Authorization': 'Bearer your-token-here' // If needed for authentication
    }
  }).then(res => {
    console.log("Sensor data sent:", { value, timestamp, sensorId, sensorType });
  }).catch(err => {
    console.error("Failed to send simulated data:", err.message);
  });
}

// Simulate data every 3 seconds
setInterval(simulateSensorData, 3000);
