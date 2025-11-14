const express = require('express')
const { verifyTokens } = require('../middleware/verifyToken')
const { createProduct } = require('../controller/productController')
const productRoutes = express.Router()
productRoutes.post("/create", verifyTokens, createProduct);
module.exports = productRoutes