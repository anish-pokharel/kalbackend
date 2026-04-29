

// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: 'Access denied. No token provided.'
//         });
//     }
    
//     try {
//         const decoded = jwt.verify(token, 'secretKey');
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(403).json({
//             success: false,
//             message: 'Invalid or expired token.'
//         });
//     }
// };

// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         return res.status(403).json({
//             success: false,
//             message: 'Admin access required.'
//         });
//     }
// };

// module.exports = { verifyToken, isAdmin };



const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Admin access required.'
        });
    }
};

// ADD THIS NEW MIDDLEWARE FOR COUNTER
const isCounter = (req, res, next) => {
    if (req.user && req.user.role === 'counter') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Counter staff access required.'
        });
    }
};

// ADD THIS FOR ADMIN OR COUNTER ACCESS
const isAdminOrCounter = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'counter')) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Admin or Counter staff access required.'
        });
    }
};

module.exports = { verifyToken, isAdmin, isCounter, isAdminOrCounter };