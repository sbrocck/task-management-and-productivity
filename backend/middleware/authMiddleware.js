const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "your_jwt_secret"; // Replace with process.env.JWT_SECRET in production

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;


