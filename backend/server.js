// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming request bodies
app.use(express.json());

// Connect to MongoDB (Local setup for testing)
mongoose.connect('mongodb://localhost:27017/task_manager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Placeholder route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

