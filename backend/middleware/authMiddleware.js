const jwt = require("jsonwebtoken");
const User = require("../models/User");  // Adjust path as necessary

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header("Authorization");

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Access denied. Invalid token format." });
        }

        // Remove 'Bearer ' from token string
        const jwtToken = token.replace("Bearer ", "");

        // Verify the JWT token using the secret stored in environment variables
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "default_jwt_secret");

        // Find user by the decoded user ID
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        // Attach user to the request object for later use
        req.user = user;
        next(); // Pass control to the next middleware

    } catch (err) {
        // Handle errors based on their type
