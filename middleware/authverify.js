const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authValidation = async (req, res, next) => {
  try {
    // Get the token from the 'Authorization' header
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract the token
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded user ID and exclude the password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found with that token" });
    }

    // Attach the user information to the request object for future use
    req.user = { _id:user._id,userId: user._id, name: user.name, email: user.email };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Auth Validation Error:", err.message);
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = authValidation;
