const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task_manager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Socket.io: Notify users when a task is updated
io.on('connection', (socket) => {
  console.log('New client connected');

  // Notify users of task updates
  socket.on('taskUpdate', (task) => {
    socket.broadcast.emit('taskUpdated', task);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
