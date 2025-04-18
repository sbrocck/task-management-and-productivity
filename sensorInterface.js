const Gpio = require('onoff').Gpio;
const axios = require('axios');

// Constants
const SENSOR_PIN = 17; // Replace with your actual GPIO pin number
const WEB_APP_URL = 'http://your-web-app-url/api/sensor-data'; // Replace with your actual endpoint
const DEBOUNCE_TIME = 200; // milliseconds

// Set up the GPIO pin
const sensor = new Gpio(SENSOR_PIN, 'in', 'both');

// Track the last time data was sent to prevent spamming
let lastSent = 0;

// Function to send sensor data to the web app
function sendData(value) {
  const timestamp = new Date().toISOString();
  console.log(`Sensor triggered. Value: ${value} at ${timestamp}`);

  axios.post(WEB_APP_URL, {
    value: value,
    timestamp: timestamp
  }).then(response => {
    console.log('Data sent successfully:', response.data);
  }).catch(error => {
    console.error('Error sending data:', error.message);
  });
}

// Watch for changes in sensor state
sensor.watch((err, value) => {
  if (err) {
    console.error('Error reading sensor data:', err);
    return;
  }

  const now = Date.now();
  if (now - lastSent > DEBOUNCE_TIME) {
    lastSent = now;
    sendData(value);
  }
});

// Clean up GPIO resources on exit
process.on('SIGINT', () => {
  sensor.unexport();
  console.log('\nGPIO resources released. Exiting gracefully.');
  process.exit();
});
