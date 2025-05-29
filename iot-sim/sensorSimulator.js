const axios = require('axios');

const sensorId = 'sensor-001';  // fixed sensor id for this simulator
const sensorType = 'temperature'; // Example sensor type

function simulateSensorData() {
  const value = Math.floor(Math.random() * 100); // random value 0-99
  const timestamp = new Date().toISOString();

  axios.post('http://localhost:5000/sensor-data', {
    value,
    timestamp,
    sensorId,
    sensorType
  }, {
    // headers if needed, otherwise remove
    // headers: {
    //   'Authorization': 'Bearer your-token-here'
    // }
  })
  .then(res => {
    console.log(`[${new Date().toLocaleTimeString()}] Sensor data sent:`, { value, timestamp, sensorId, sensorType });
  })
  .catch(err => {
    console.error("Failed to send simulated data:", err.message);
  });
}

// Simulate every 3 seconds
setInterval(simulateSensorData, 3000);
