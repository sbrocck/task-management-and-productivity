const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); // Assuming your task controller

// Task Routes
router.post("/", taskController.createTask);  // Create task
router.get("/", taskController.getTasks);    // Get tasks
router.put("/:taskId", taskController.updateTask); // Update task
router.delete("/:taskId", taskController.deleteTask); // Delete task

// Add the sensor data route
router.post("/sensor-data", taskController.receiveSensorData);  // <-- New route for sensor data

module.exports = router;
