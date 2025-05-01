const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); // Import task controller
const sensorController = require("../controllers/sensorController"); // Import sensor controller

// Task Routes
router.post("/", taskController.createTask);  // Create task
router.get("/", taskController.getTasks);    // Get tasks
router.put("/:taskId", taskController.updateTask); // Update task
router.delete("/:taskId", taskController.deleteTask); // Delete task

// Add the sensor data route
router.post("/sensor-data", sensorController.receiveSensorData);  // Use sensorController for this route

module.exports = router;
