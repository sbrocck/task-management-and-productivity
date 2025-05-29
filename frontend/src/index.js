// frontend/src/components/SensorData.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust URL if needed

const SensorData = () => {
  const [sensorData, setSensorData] = useState({ value: null, timestamp: null });

  useEffect(() => {
    // Listen for sensor data updates
    socket.on("sensorDataUpdate", (data) => {
      setSensorData(data);
    });

    // Cleanup on unmount
    return () => {
      socket.off("sensorDataUpdate");
    };
  }, []);

  return (
    <div>
      <h2>Real-time Sensor Data</h2>
      <p>Sensor Value: {sensorData.value !== null ? sensorData.value : "Loading..."}</p>
      <p>Timestamp: {sensorData.timestamp || "Loading..."}</p>
    </div>
  );
};

export default SensorData;
