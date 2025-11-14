const express = require("express");
const { verifyTokens } = require("../middleware/verifyToken");
const { createCategory } = require("../controller/categoryController");

const categoryRoutes = express.Router()
categoryRoutes.post("/:slug/create", verifyTokens, createCategory)
module.exports = categoryRoutes