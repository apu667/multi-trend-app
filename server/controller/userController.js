const User = require("../models/userModels");
const Vendor = require("../models/vendorModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

// Token generator
const generateToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// ====================== MainSignUp ======================
exports.mainSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role: "mainUser", vendor: null });
    const token = generateToken(newUser);

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 24*60*60*1000 });
    res.status(201).json({ message: "User registered", user: newUser });
};

// ====================== MainSignIn ======================
exports.mainSignIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 24*60*60*1000 });
    res.json({ message: "Login successful", user });
};

// ====================== VendorSignUp ======================
exports.vendorSignUp = async (req, res) => {
    const { slug } = req.params;
    const { name, email, password } = req.body;

    const vendor = await Vendor.findOne({ vendorSlug: slug });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const existingUser = await User.findOne({ email, vendor: vendor._id });
    if (existingUser) return res.status(400).json({ message: "Email already registered for this vendor" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role: "vendorUser", vendor: vendor._id });
    const token = generateToken(newUser);

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 24*60*60*1000 });
    res.status(201).json({ message: "Vendor user registered", user: newUser });
};

// ====================== VendorSignIn ======================
exports.vendorSignIn = async (req, res) => {
    const { slug } = req.params;
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ vendorSlug: slug });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const user = await User.findOne({ email, vendor: vendor._id }).select("+password");
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 24*60*60*1000 });
    res.json({ message: "Vendor login successful", user });
};

// ====================== Profile ======================
exports.profile = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        res.json({ user });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// ====================== Logout ======================
exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};
