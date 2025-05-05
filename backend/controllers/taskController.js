const Task = require("../models/task");
const SensorData = require("../models/sensorData"); // Optional, if you're storing sensor data

// Create a new task
exports.createTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(400).json({ error: err.message });
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

    res.json({ tasks, currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Task title is required" });
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
    res.status(400).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handle IoT sensor data (can be expanded to save to DB)
exports.receiveSensorData = async (req, res) => {
  const data = req.body;
  console.log("📡 Received sensor data:", data);

  try {
    const newSensorData = new SensorData(data); // Ensure model fields match the structure
    await newSensorData.save();
    res.status(201).json({ message: "Sensor data saved" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

