// routes/bookRoutes.js

const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Public routes
router.get("/", bookController.getAllBooks);           // GET /books?category=&isFeatured=&isOnSale=&minPrice=&maxPrice=
router.get("/featured", bookController.getFeaturedBooks); // GET /books/featured
router.get("/:id", bookController.getBookById);       // GET /books/:id

module.exports = router;

/*const express = require("express");
const router = express.Router();
const Book = require("../../models/BookSchema");
const multer = require("multer");
const path = require("path");
const { verifyToken, isAdmin } = require("../../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images")); // ✅ Correct path relative to this file
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const upload = multer({ storage: storage });
//CREATE A BOOK
router.post(
  "/createBook",
  verifyToken,
  isAdmin,
  upload.single("coverImage"),
  async (req, res) => {
    try {
      const {
        title,
        author,
        description,
        price,
        stock,
        isFeatured,
        category,
        isOnSale,
        discountPercent,
        coverImagere,
      } = req.body;
      if (!title || !author || !description || !price || !stock) {
        return res.status(400).json({ message: "All fields are required !" });
      }
      const newBook = new Book({
        title,
        author,
        description,
        price,
        stock,
        isFeatured,
        category,
        isOnSale,
        discountPercent,
        coverImage: req.file?.filename,
      });
      if (req.file) console.log(req.file);

      await newBook.save();
      res
        .status(201)
        .json({ message: "Book created successfully", book: newBook });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
//GET ALL BOOKS
router.get("/getBooks", verifyToken, isAdmin, async (req, res) => {
  try {
    const books = await Book.find().populate("category", "name");
    return res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//GET A BOOK BY ITS ID
router.get("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!book) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    return res.status(200).json({ message: book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE A BOOK
router.put("/updateBook/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const book = Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category", "name");
    if (!book) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    return res.status(200).json({ message: "Book Updated successfully" }, book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//DELETE A BOOK BY ITS ID
router.delete("/deleteBook/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const book = Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    return res.status(200).json({ message: "Book Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
*/
