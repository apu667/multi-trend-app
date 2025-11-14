const mongoose = require('mongoose');

const connectedDb = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is successfully connected")
    } catch (error) {
        console.log("Database connection failed")
    }
}

module.exports = connectedDb