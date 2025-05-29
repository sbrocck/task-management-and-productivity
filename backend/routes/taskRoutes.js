const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const sensorController = require("../controllers/sensorController");

// Task routes
router.post("/", taskController.createTask);           // Create a new task
router.get("/", taskController.getTasks);               // Get tasks (with optional pagination)
router.put("/:id", taskController.updateTask);          // Update a task by ID
router.delete("/:id", taskController.deleteTask);       // Delete a task by ID

// Route for receiving sensor data related to tasks or IoT
router.post("/sensor-data", sensorController.receiveSensorData);

module.exports = router;
