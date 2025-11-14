const Category = require('../models/categoryModel');
const Vendor = require('../models/vendorModels');
const User = require("../models/userModels");
const slugify = require('slugify');

module.exports.createCategory = async (req, res) => {
  const userId = req.user.userId;
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Find vendor by vendor slug
    const vendor = await Vendor.findById(user.vendor);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // Check user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check role
    if (user.role !== "vendorAdmin") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to create category",
      });
    }

    // Create category slug
    const categorySlug = slugify(name, { lower: true, strict: true });

    // Check category exists for same vendor
    const exists = await Category.findOne({ slug: categorySlug, vendor: vendor._id });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Create category
    const createCategory = await Category.create({
      name,
      slug: categorySlug,
      image,
      vendor: vendor._id,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: createCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
