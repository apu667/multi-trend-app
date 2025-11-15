const jwt = require('jsonwebtoken');

module.exports.verifyTokens = async (req, res, next) => {
     try {
        // Cookie থেকে token নেওয়া
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found in cookies"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role, iat, exp }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};