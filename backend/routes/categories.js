const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Public category routes
router.get("/", categoryController.getAllCategories); // GET /categories?name=
router.get("/:id", categoryController.getCategoryById); // GET /categories/:id

module.exports = router;
