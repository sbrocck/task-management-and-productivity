const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
