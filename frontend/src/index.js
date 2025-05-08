import io from 'socket.io-client'; // Ensure socket.io-client is installed (npm install socket.io-client)

// Establish a connection to the server
const socket = io("http://localhost:5000"); // Replace with your server URL

// Listen for the real-time sensor data update
socket.on("sensorDataUpdate", (data) => {
  console.log("Sensor data received:", data);
  // Update your UI here, like adding it to a div or updating a graph
  document.getElementById("sensorValue").innerText = `Sensor Value: ${data.value}`;
  document.getElementById("timestamp").innerText = `Timestamp: ${data.timestamp}`;
});
