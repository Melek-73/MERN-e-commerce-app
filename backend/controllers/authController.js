const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.verifyUser = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    res.json({
      success: true,
      role: req.user.role,
      user: {
        email: req.user.email,
        name: req.user.name,
        id: req.user._id,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};


// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res
        .status(400)
        .json({
          success: false,
          message: "Email, password, and name are required",
        });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role: "user",
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email, role: newUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1w" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user: newUser,
        token,
        role: newUser.role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// SIGN IN USER
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1w" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "User signed in successfully",
        user,
        token,
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGOUT USER
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  try {
    const oldToken =
      req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!oldToken)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(oldToken, process.env.SECRET_KEY);
    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.SECRET_KEY,
      { expiresIn: "1w" }
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, token: newToken });
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
