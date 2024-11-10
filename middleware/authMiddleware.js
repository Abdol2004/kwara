const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization"); // Get token from the header

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Split the token to get the actual JWT
    const bearerToken = token.split(' ')[1]; // Extract the token from "Bearer <token>"

    if (!bearerToken) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.admin = decoded; // Attach decoded data to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = authMiddleware;