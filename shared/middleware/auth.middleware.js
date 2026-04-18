const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            })
        }
        console.log("HEADERS:", req.headers.authorization)

        const token =  authHeader.split(' ')[1];
        console.log("TOKEN:", token)
        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format'
            })
        }

        const decoded = jwt.verify(token, JWT_SECRET);
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