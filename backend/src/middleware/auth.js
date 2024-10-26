const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, 'snfjikdsvnkfdnvjkdfjndkfjd');
        req.user = { userId: decoded.userID }; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};


module.exports = auth;

