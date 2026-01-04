const Category = require("../models/CategorySchema");

// GET ALL CATEGORIES (public) with optional filter by name
exports.getAllCategories = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, "i"); // case-insensitive search
    const categories = await Category.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET CATEGORY BY ID (public)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
