const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost/task-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Basic endpoint to verify the server is running
app.get("/", (req, res) => {
  res.send("Task Management API");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Task management routes
app.use("/api/tasks", taskRoutes);

// Set the server to listen on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
