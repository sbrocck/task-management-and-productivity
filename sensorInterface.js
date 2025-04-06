const Gpio = require('onoff').Gpio;
const axios = require('axios');

// Replace with your GPIO pin number
const sensor = new Gpio(17, 'in', 'both');

// Function to send sensor data to your web app
function sendData(value) {
  axios.post('http://your-web-app-url/api/sensor-data', {
    value: value,
    timestamp: new Date().toISOString()
  }).then(response => {
    console.log('Data sent successfully:', response.data);
  }).catch(error => {
    console.error('Error sending data:', error);
  });
}

// Watch for changes in sensor data
sensor.watch((err, value) => {
  if (err) {
    console.error('Error reading sensor data:', err);
    return;
  }
  sendData(value);
});

// Clean up on exit
process.on('SIGINT', () => {
  sensor.unexport();
});
