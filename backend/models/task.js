const mongoose = require('mongoose');

// Define the schema for a task in the database
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  assignedTo: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' }
});

// Export the model to be used in other files
module.exports = mongoose.model('Task', taskSchema);
