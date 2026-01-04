const Book = require("../models/BookSchema");

// GET ALL BOOKS with optional filters
exports.getAllBooks = async (req, res) => {
  try {
    const { category, isFeatured, isOnSale, minPrice, maxPrice ,search,limit} = req.query;

    // Build filter object dynamically
    const filter = {};
    if (category) filter.category = category;
    if (isFeatured) filter.isFeatured = isFeatured === "true";
    if (isOnSale) filter.isOnSale = isOnSale === "true";
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (search) filter.title = { $regex: search, $options: "i" };
    
    const books = await Book.find(filter)
      .populate("category", "name slug") // populate category name and slug
      .sort({ createdAt: -1 }) // newest books first
      .limit(limit ? Number(limit) : 50); // optional limit from query params
    console.log(books)
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE BOOK BY ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "category",
      "name slug"
    );

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET FEATURED BOOKS (optional)
exports.getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.find({ isFeatured: true })
      .limit(10)
      .populate("category", "name slug");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
