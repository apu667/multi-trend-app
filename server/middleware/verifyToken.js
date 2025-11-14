const jwt = require('jsonwebtoken');

module.exports.verifyTokens = async (req, res, next) => {
    try {
        // headers lowercase
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // Bearer token format
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role, iat, exp }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};