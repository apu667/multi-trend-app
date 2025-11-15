const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
const connectedDb = require('./config/db');
const userRouter = require('./routes/userRoutes');
const vendorRouter = require('./routes/vendorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cookieParser = require("cookie-parser");
dotenv.config();
connectedDb()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // React app URL
    credentials: true,               // ✅ cookie send করার জন্য
}));

app.use("/api/v1/auth", userRouter)
app.use("/api/v1/vendor", vendorRouter)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`)
})