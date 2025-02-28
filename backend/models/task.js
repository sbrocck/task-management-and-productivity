const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true // Ensure that every task has a title
    },
    description: {
      type: String,
      required: false // Description is optional
    },
    dueDate: {
      type: Date, // Can be renamed to 'deadline' if needed
      required: false // Due date is optional
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links the task to a specific user
      required: false // Task doesn't have to be assigned to anyone
    },
    status: {
      type: String,
      enum: ["to-do", "in-progress", "completed"],
      default: "to-do" // Default status when the task is created
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium" // Default priority level
    }
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Task", taskSchema);
