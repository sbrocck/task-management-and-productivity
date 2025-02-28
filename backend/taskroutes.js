// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/tasks', taskController.createTask);

// Update an existing task (mark as completed, or change priority)
router.patch('/tasks/:id', taskController.updateTask);

// Get all tasks with filtering options
router.get('/tasks', taskController.getTasks);

module.exports = router;
