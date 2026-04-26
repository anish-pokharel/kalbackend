

// const jwt = require('jsonwebtoken');

// // Verify token middleware
// function verifyToken(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).json({ 
//             success: false,
//             message: 'Unauthorized request - No token provided' 
//         });
//     }
    
//     const token = req.headers.authorization.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ 
//             success: false,
//             message: 'Unauthorized request - Token is empty' 
//         });
//     }
    
//     try {
//         const payload = jwt.verify(token, 'secretKey');
//         req.user = payload;
//         next();
//     } catch (error) {
//         return res.status(401).json({ 
//             success: false,
//             message: 'Unauthorized request - Invalid token' 
//         });
//     }
// }

// // Check if user is admin middleware
// function isAdmin(req, res, next) {
//     try {
//         if (req.user && req.user.role === 'admin') {
//             next();
//         } else {
//             return res.status(403).json({ 
//                 success: false,
//                 message: 'Access denied. Admin only.' 
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({ 
//             success: false,
//             message: 'Error checking admin status',
//             error: error.message 
//         });
//     }
// }

// module.exports = { verifyToken, isAdmin };




const jwt = require('jsonwebtoken');

// ✅ Verify Token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'secretKey');
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

// ✅ Admin Check
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
    });
  }
}

module.exports = { verifyToken, isAdmin };