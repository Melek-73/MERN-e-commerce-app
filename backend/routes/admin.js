  const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

// 🧰 Multer config for cover image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// 🛠 Routes
router.post("/books", verifyToken, isAdmin, upload.single("coverImage"), adminController.createBook);
//router.get("/books", verifyToken, isAdmin, adminController.getAllBooks);
router.put("/books/:id", verifyToken, isAdmin, adminController.updateBook);
router.delete("/books/:id", verifyToken, isAdmin, adminController.deleteBook);
// ✅ GET single book (admin)
//router.get("/books/:id", verifyToken, isAdmin, adminController.getBookById);// Admin-only category routes
router.post("/categories", verifyToken, isAdmin, adminController.createCategory);
router.put("/categories/:id", verifyToken, isAdmin, adminController.updateCategory);
router.delete("/categories/:id", verifyToken, isAdmin, adminController.deleteCategory);
router.get("/categories", verifyToken, isAdmin, adminController.getAllCategoriesAdmin);

module.exports = router;


