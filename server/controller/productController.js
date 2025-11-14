const Product = require('../models/productModel');
const User = require("../models/userModels");
const Category = require("../models/categoryModel");
const Vendor = require("../models/vendorModels");

module.exports.createProduct = async (req, res) => {
  const userId = req.user.userId;
  const { name, description, price, category, ProductImages, productGallery, stock, attributes } = req.body;

  // Validation
  if (!name || !price || !category || !ProductImages || !stock) {
    return res.status(400).json({
      success: false,
      message: "Name, Price, Category, ProductImages, Stock are required",
    });
  }

  try {
    // Check user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check role
    if (user.role !== "vendorAdmin") {
      return res.status(403).json({
        success: false,
        message: "Only vendor admin can create products",
      });
    }

    // Vendor check
    const vendor = await Vendor.findById(user.vendor);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Category check
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Create product
    const newProduct = await Product.create({
      name,
      description,
      price,
      category: categoryData._id,
      vendor: vendor._id,
      ProductImages,
      productGallery,
      stock,
      attributes,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
