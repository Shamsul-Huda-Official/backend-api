const jwt = require('jsonwebtoken');
const jwt_secret = require('../config/env').JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            })
        }

        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded; // req.user contains { id, role, institutionId }
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token',
        })
    }
}

module.exports = authMiddleware;