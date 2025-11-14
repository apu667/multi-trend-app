const Vendor = require('../models/vendorModels');
const User = require('../models/userModels');
const slugify = require('slugify'); // ✅ fixed

module.exports.createVendor = async (req, res) => {
    const { VendorName } = req.body;
    const userId = req.user.userId;

    if (!VendorName) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        // Check if user already owns a vendor
        const exitIngVendor = await User.findOne({ vendorOwn: userId });
        if (exitIngVendor) {
            return res.status(401).json({
                success: false,
                message: "Already existing vendor"
            });
        }

        const vendorSlug = slugify(VendorName, { lower: true, strict: true });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "mainUser") {
            return res.status(403).json({
                success: false,
                message: "You cannot create a store"
            });
        }

        // Create vendor
        const vendor = await Vendor.create({
            VendorName,
            vendorSlug
        });

        // Update user
        user.role = "vendorAdmin";
        user.vendor = vendor._id;
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Vendor created successfully",
            vendor
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports.getVendor = async (req, res) => {
    const userId = req.user.userId;
    console.log(userId)
    try {
        const user = await User.findById(userId).populate("vendor");
        if (!user || !user.vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }

        return res.status(200).json({ success: true, vendor: user.vendor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
