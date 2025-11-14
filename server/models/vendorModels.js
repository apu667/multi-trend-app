const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorOwn: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    VendorName: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
    },
    vendorSlug: {
      type: String,
      required: [true, "Shop vendorSlug is required"],
      unique: true,        // ★ UNIQUE INDEX
      index: true,         // fast search
    },
    shopLogo: {
      type: String,
      default: "",
    },
    shopBanner: {
      type: String,
      default: "",
    },
    shopDescription: {
      type: String,
      default: "Welcome to my shop!",
    },
    shopAddress: {
      type: String,
    },

    subscription: {
      planName: { type: String, enum: ["Free", "Basic", "Pro", "Premium"], default: "Free" },
      price: { type: Number, default: 0 },
      durationInDays: { type: Number, default: 30 },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date },
      status: {
        type: String,
        enum: ["Active", "Pending", "Expired"],
        default: "Pending",
        index: true          // ★ Filter fast by subscription status
      },
      paymentProof: { type: String, default: "" },
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Blocked"],
      default: "Pending",
      index: true           // ★ Admin filter fast
    },

    stats: {
      totalProducts: { type: Number, default: 0 },
      totalOrders: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Auto calculate subscription endDate
vendorSchema.pre("save", function (next) {
  if (this.subscription && this.subscription.startDate && !this.subscription.endDate) {
    const endDate = new Date(this.subscription.startDate);
    endDate.setDate(endDate.getDate() + this.subscription.durationInDays);
    this.subscription.endDate = endDate;
  }
  next();
});

// ★ Text Search Index for vendor name
vendorSchema.index({ vendorSlug: "text" });

module.exports = mongoose.model("Vendor", vendorSchema);
