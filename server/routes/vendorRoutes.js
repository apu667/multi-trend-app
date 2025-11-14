const express = require('express');

const { createVendor, getVendor } = require('../controller/VendorController');
const { verifyTokens } = require('../middleware/verifyToken');

const vendorRouter = express.Router()
vendorRouter.post("/create", verifyTokens,createVendor )

vendorRouter.get("/get",verifyTokens,getVendor)
module.exports = vendorRouter
