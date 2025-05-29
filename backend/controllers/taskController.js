const Task = require("../models/task");
const SensorData = require("../models/sensorData"); // Optional

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, completed } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Valid task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      completed,
      user: req.user._id
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(400).json({ error: "Failed to create task", details: err.message });
  }
};

// Get tasks (with optional pagination)
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ user: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks, currentPage: page });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (title && typeof title !== "string") {
      return res.status(400).json({ error: "Title must be a string" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(400).json({ error: "Failed to update task", details: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete task", details: err.message });
  }
};

// Receive and optionally store IoT sensor data
export
