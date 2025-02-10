const Task = require("../models/task");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo, status, priority } = req.body;
  try {
    const newTask = new Task({ title, description, dueDate, assignedTo, status, priority });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(400).json({ message: "Error creating task", error: err });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tasks", error: err });
  }
};
