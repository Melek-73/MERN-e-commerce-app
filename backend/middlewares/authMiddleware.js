const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

async function verifyToken(req, res, next) {
  try {
    // ✅ Read token from cookie or Authorization header (in my case from cookies)
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ Check user exists
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found or removed" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
}

module.exports = { verifyToken, isAdmin };
