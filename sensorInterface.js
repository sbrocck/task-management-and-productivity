const { Gpio } = require('onoff');
const axios = require('axios');

// Constants
const SENSOR_PIN = 17; // Replace with your actual GPIO pin number
const WEB_APP_URL = 'http://your-web-app-url/api/sensor-data'; // Replace with your actual endpoint
const DEBOUNCE_TIME = 200; // milliseconds

// Initialize sensor GPIO pin as input, watching for both rising and falling edges
const sensor = new Gpio(SENSOR_PIN, 'in', 'both');

// Timestamp of the last sent data to prevent flooding
let lastSent = 0;

/**
 * Sends sensor data to the web app endpoint.
 * @param {number} value - The sensor value read from GPIO.
 */
function sendData(value) {
  const timestamp = new Date().toISOString();
  console.log(`Sensor triggered. Value: ${value} at ${timestamp}`);

  axios.post(WEB_APP_URL, { value, timestamp })
    .then(response => {
      console.log('Data sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending data:', error.message);
    });
}

/**
 * Watches for sensor state changes and triggers data sending with debounce.
 */
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

// Cleanup GPIO on exit to prevent resource locking
process.on('SIGINT', () => {
  sensor.unexport();
  console.log('\nGPIO resources released. Exiting gracefully.');
  process.exit();
});
