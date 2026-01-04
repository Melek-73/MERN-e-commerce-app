const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Admin-only routes
router.get("/", verifyToken, isAdmin, userController.getAllUsers); // GET all users
router.get("/:id", verifyToken, isAdmin, userController.getUserById); // GET single user by ID
router.put("/:id", verifyToken, isAdmin, userController.updateUser); // UPDATE user
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser); // DELETE user

module.exports = router;
