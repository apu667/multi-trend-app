// =======================================
// IMPORTS
// =======================================
const User = require("../models/userModels");
const Vendor = require("../models/vendorModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();   // MUST BE FIRST LINE

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

// =======================================
// Generate Token Function
// =======================================
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
    );
};

// =======================================
// Main Website SignUp
// =======================================
module.exports.mainSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // Check email exists but only for main website (vendor = null)
        const existingUser = await User.findOne({ email, vendor: null });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "mainUser",
            vendor: null,
        });

        const token = generateToken(newUser);

        return res.status(201).json({
            success: true,
            message: "Main user registered successfully",
            user: newUser,
            token
        });
    } catch (error) {
        console.error("MainSignUp Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// =======================================
// Main Website SignIn
// =======================================
module.exports.mainSignIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");;
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// =======================================
// Vendor SignUp
// =======================================
module.exports.vendorSignUp = async (req, res) => {
    const { slug } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password || !vendor) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // 1. Vendor find by slug
        const vendor = await Vendor.findOne({ vendorSlug: slug });
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }

        // 2. Email unique for this vendor?
        const existingUser = await User.findOne({ email, vendor });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered for this vendor" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendorUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "vendorUser",
            vendor,
        });

        const token = generateToken(newVendorUser);

        return res.status(201).json({
            success: true,
            message: "Vendor user registered successfully",
            data: { user: newVendorUser, token },
        });
    } catch (error) {
        console.error("VendorSignUp Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// =======================================
// Vendor SignIn
// =======================================
module.exports.vendorSignIn = async (req, res) => {
    const { slug } = req.params;
    const { email, password } = req.body;

    try {
        // 1. Vendor find by slug
        const vendor = await Vendor.findOne({ vendorSlug: slug });
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }

        // 2. Find user under this vendor account
        const user = await User.findOne({ email, vendor: vendor._id });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found under this vendor",
            });
        }

        // 3. Password check
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Vendor user login successful",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
