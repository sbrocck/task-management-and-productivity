const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware"); // Optional, if you want authentication

// Route to create a new task
router.post("/tasks", authMiddleware, taskController.createTask);

// Route to get all tasks
router.get("/tasks", authMiddleware, taskController.getTasks);

// Route to update a task
router.put("/tasks/:taskId", authMiddleware, taskController.updateTask);

// Route to delete a task
router.delete("/tasks/:taskId", authMiddleware, taskController.deleteTask);

module.exports = router;
