const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    // Single or main product images
    ProductImages: {
      type: [String], 
      default: [],
    },

    // Multiple gallery images
    productGallery: {
      type: [String], 
      default: [],
    },

    stock: {
      type: Number,
      default: 0,
    },

    // Dynamic attributes (multi size, multi color, multi specs)
    attributes: {
      type: Map,
      of: [String],  // VALUE = array of strings (ex: ["M","L","XL"])
      default: {},
    },

    status: {
      type: String,
      enum: ["active", "inactive", "out-of-stock"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
