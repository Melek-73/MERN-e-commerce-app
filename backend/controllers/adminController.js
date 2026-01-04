// controllers/adminController.js
const Book = require("../models/BookSchema");

exports.createBook = async (req, res) => {
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
    } = req.body;

    // Validation
    if (!title || !author || !description || !price || !stock) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    console.log("📦 BODY:", req.body);
    console.log("🖼️ FILE:", req.file);

    // Create new book
    const newBook = new Book({
      title,
      author,
      description,
      price: Number(price),
      stock: Number(stock),
      isFeatured: isFeatured === "true",
      isOnSale: isOnSale === "true",
      discountPercent: discountPercent ? Number(discountPercent) : null,
      category,
      coverImage: req.file ? req.file.filename : null,
    });

    await newBook.save();

    res
      .status(201)
      .json({ message: "✅ Book created successfully", book: newBook });
  } catch (error) {
    console.error("❌ Error creating book:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ error: error.message });
    //res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update existing book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all books (admin view — includes hidden/private data if needed)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("category", "name slug");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 🟦 GET single book by ID (admin)
exports.getBookById = async (req, res) => {
  try {
    // Find the book and populate category fields (name, slug)
    const book = await Book.findById(req.params.id).populate(
      "category",
      "name slug"
    );

    // If not found -> 404
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Return the book (admin can see same fields; you may choose to include extra admin-only info)
    return res.status(200).json(book);
  } catch (error) {
    // If invalid ID format or other DB error
    return res.status(500).json({ error: error.message });
  }
};

const Category = require("../models/CategorySchema");

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });

    const newCategory = new Category({ name, description, image });
    await newCategory.save();
    res
      .status(201)
      .json({ success: true, message: "Category created", data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.status(200).json({
      success: true,
      message: "Category updated",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL CATEGORIES (admin view)
exports.getAllCategoriesAdmin = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
