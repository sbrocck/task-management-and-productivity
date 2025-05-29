const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path as necessary

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. Token missing or improperly formatted." });
    }

    // Extract the actual JWT token
    const jwtToken = token.split(" ")[1];

    // Verify token using your secret (fallback provided for development)
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "default_jwt_secret");

    // Retrieve user associated with token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Access denied. User not found." });
    }

    // Attach user to request for later use
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ error: "Access denied. Invalid or expired token." });
  }
};

module.exports = authMiddleware;
