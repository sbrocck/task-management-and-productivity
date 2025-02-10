const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error registering user", error: err });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err });
  }
};
