require('dotenv').config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "Error 1"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
        } else {
            return res.status(403).json({
                msg: "Error 2"
            });
        }

        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({
            err
        });
    }
};

module.exports = authMiddleware;
