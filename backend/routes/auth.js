const express = require("express");
const router = express.Router()
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware"); // ✅ correct file
const { verifyUser } = require("../controllers/authController");

// Public routes
router.post("/signup", authController.register);    
router.post("/signin", authController.signin);
router.post("/logout", authController.logout);
router.get("/refresh-token", authController.refreshToken);
router.get("/verify", verifyToken, verifyUser);


module.exports = router;
