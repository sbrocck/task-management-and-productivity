const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Ensure that every task has a title
      trim: true
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    dueDate: {
      type: Date,
      required: false
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    status: {
      type: String,
      enum: ["to-do", "in-progress", "completed"],
      default: "to-do"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true // The user who created the task
    }
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Task", TaskSchema);
