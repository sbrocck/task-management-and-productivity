const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, taskController.createTask);  // Protected route
router.get("/", authMiddleware, taskController.getTasks);  // Protected route

module.exports = router;
