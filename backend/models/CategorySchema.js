const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"], // clearer error
      trim: true,
      unique: true,
      maxlength: [100, "Category name must be under 100 characters"], // optional validation
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description too long"], // avoid overly large text
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// 🔹 Automatically generate slug before saving
CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

// 🔹 Virtual populate (to easily get all books in this category)
CategorySchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "category",
});

// Include virtuals when converting documents to JSON or objects
CategorySchema.set("toObject", { virtuals: false });
CategorySchema.set("toJSON", { virtuals: false });

module.exports = mongoose.model("Category", CategorySchema);
