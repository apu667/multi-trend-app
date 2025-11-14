const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true, // প্রতিটি category vendor এর সাথে linked
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: {
      type: String, // category image URL
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
