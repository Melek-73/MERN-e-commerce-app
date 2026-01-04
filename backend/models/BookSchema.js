// models/BookSchema.js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    coverImage: {
      type: String, // store the filename only, not the full path
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  {
    timestamps: true, // ✅ adds createdAt and updatedAt automatically
  }
);

// 🧠 Optional: Virtual for final image URL (useful if you serve from /public/images)
BookSchema.virtual("coverImageURL").get(function () {
  if (this.coverImage) {
    return `/images/${this.coverImage}`;
  }
  return null;
});

// 🧠 Optional: Schema indexes for faster search/filtering
BookSchema.index({ title: "text", author: "text", description: "text" });

module.exports = mongoose.model("Book", BookSchema);

/*const mongoose = require("mongoose")
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    //type: String,

    type: Number,
    required: true,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  discountPercent: {
    //type: String,
    type: Number,
    default: 0,
    //default: false,
  },
  coverImage: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});


module.exports = mongoose.model("Book", BookSchema);
*/
