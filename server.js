const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/task_manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Socket.io: Notify users when a task is updated
io.on("connection", (socket) => {
  console.log("⚡ New client connected");

  // Broadcast task updates
  socket.on("taskUpdate", (task) => {
    socket.broadcast.emit("taskUpdated", task);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Sensor Data Route (handling POST requests to "/api/tasks/sensor-data")
const { receiveSensorData } = require("./controllers/taskController");
taskRoutes.post("/sensor-data", receiveSensorData); // <-- This is where you add the sensor data route

// Use Routes
app.use("/api/auth", authRoutes);  // Auth routes (e.g., login, signup)
app.use("/api/tasks", taskRoutes);  // Task routes (CRUD operations for tasks)

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


