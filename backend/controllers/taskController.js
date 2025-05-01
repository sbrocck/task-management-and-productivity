const Task = require("../models/task"); // Import the Task model

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo, priority } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      priority
    });

    await newTask.save();
    res.status(201).json(newTask); // Return the newly created task
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get all tasks (or filter them by query parameters)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // You can modify this to filter by query parameters
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body; // Expect the fields to be updated in the request body

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask); // Return the updated task
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
// Receive and save sensor data as a task
exports.receiveSensorData = async (req, res) => {
  try {
    const { value, timestamp } = req.body;

    const newTask = new Task({
      title: `Sensor Trigger: ${value}`,
      description: `Received sensor input at ${timestamp}`,
      assignedTo: "System",
      priority: value === 1 ? "High" : "Low",
      dueDate: null
    });

    await newTask.save();
    res.status(201).json({ message: "Sensor data saved as task", data: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error saving sensor data", error });
  }
};

