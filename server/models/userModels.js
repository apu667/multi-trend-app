const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    profilePic: { type: String, default: "" },

    // Role System
    role: {
      type: String,
      enum: ["mainUser", "vendorUser", "vendorAdmin", "superAdmin"],
      default: "mainUser",
    },

    // Vendor Links
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", default: null }, // assigned vendor for vendorUser/vendorAdmin
    ownVendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", default: null }, // mainUser created vendor

    // Status & Security
    isVerifiedEmail: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

// Vendor-specific email uniqueness
userSchema.index({ email: 1, vendor: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
