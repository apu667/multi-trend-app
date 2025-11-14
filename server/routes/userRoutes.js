const express = require("express");
const { mainSignUp, mainSignIn, vendorSignUp } = require("../controller/userController");

const userRouter = express.Router();
userRouter.post("/mainSignUp", mainSignUp)
userRouter.post("/mainSignIn", mainSignIn)
userRouter.post("/:slug/vendorSignUp", vendorSignUp)
userRouter.post("/:slug/vendorSignIn", mainSignUp)
module.exports = userRouter