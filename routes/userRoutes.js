// const express = require("express");
// const router = express.Router();
// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { verifyToken, isAdmin } = require('../authMiddleware');

// // Login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: 'Email and password are required' 
//             });
//         }

//         const userData = await User.findOne({ email });
        
//         if (!userData) {
//             return res.status(401).json({ 
//                 success: false,
//                 message: 'Invalid email or password' 
//             });
//         }
        
//         if (!userData.isVerified) {
//             return res.status(401).json({ 
//                 success: false,
//                 message: 'Please verify your email before logging in',
//                 needsVerification: true,
//                 email: userData.email 
//             });
//         }
        
//         const isPasswordValid = await bcrypt.compare(password, userData.password);
        
//         if (!isPasswordValid) {
//             return res.status(401).json({ 
//                 success: false,
//                 message: 'Invalid email or password' 
//             });
//         }
        
//         // Generate token with role included
//         const token = jwt.sign(
//             { 
//                 email: userData.email, 
//                 userId: userData._id, 
//                 firstName: userData.firstName, 
//                 lastName: userData.lastName,
//                 role: userData.role 
//             }, 
//             process.env.JWT_SECRET || 'secretKey',
//             { expiresIn: process.env.JWT_EXPIRE || '24h' }
//         );
        
//         const userResponse = {
//             id: userData._id,
//             email: userData.email,
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             role: userData.role,
//             isVerified: userData.isVerified
//         };
        
//         res.json({ 
//             success: true,
//             message: 'Login successful', 
//             user: userResponse, 
//             token: token 
//         });
        
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ 
//             success: false,
//             message: 'Something went wrong', 
//             error: error.message 
//         });
//     }
// });

// // Register route (add this if missing)
// router.post('/register', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, confirmPassword, phoneNo, mobileNo, address } = req.body;

//         // Validate required fields
//         if (!firstName || !lastName || !email || !password || !confirmPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide all required fields'
//             });
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Passwords do not match'
//             });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User already exists with this email'
//             });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create user
//         const user = new User({
//             firstName,
//             lastName,
//             email: email.toLowerCase(),
//             password: hashedPassword,
//             phoneNo: phoneNo || '',
//             mobileNo: mobileNo || '',
//             address: address || '',
//             termCondition: true,
//             role: 'customer',
//             isVerified: true, // Set to false if email verification is required
//             registeredDate: new Date().toISOString()
//         });

//         await user.save();

//         // Generate token
//         const token = jwt.sign(
//             { 
//                 email: user.email, 
//                 userId: user._id, 
//                 firstName: user.firstName, 
//                 lastName: user.lastName,
//                 role: user.role 
//             }, 
//             process.env.JWT_SECRET || 'secretKey',
//             { expiresIn: process.env.JWT_EXPIRE || '24h' }
//         );

//         const userResponse = {
//             id: user._id,
//             email: user.email,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             role: user.role,
//             isVerified: user.isVerified
//         };

//         res.status(201).json({
//             success: true,
//             message: 'Registration successful',
//             user: userResponse,
//             token: token
//         });

//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error during registration',
//             error: error.message
//         });
//     }
// });

// // Get all users (admin only)
// router.get('/users', verifyToken, isAdmin, async (req, res) => {
//     try {
//         const users = await User.find().select('-password -__v');
        
//         res.json({ 
//             success: true,
//             data: users 
//         });
        
//     } catch (error) {
//         console.error('Get users error:', error);
//         res.status(500).json({ 
//             success: false,
//             message: 'Error fetching users', 
//             error: error.message 
//         });
//     }
// });

// // Get user by email (protected)
// router.get('/user', verifyToken, async (req, res) => {
//     try {
//         const { email } = req.user;
//         const userData = await User.findOne({ email }).select('-password -__v');
        
//         if (userData) {
//             res.json({ 
//                 success: true,
//                 data: userData 
//             });
//         } else {
//             res.status(404).json({ 
//                 success: false,
//                 message: "User not found" 
//             });
//         }
//     } catch (error) {
//         console.error('Get user error:', error);
//         res.status(500).json({ 
//             success: false,
//             message: 'Something went wrong', 
//             error: error.message 
//         });
//     }
// });

// // Verify token (protected)
// router.get('/verify', verifyToken, async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.user.email }).select('-password -__v');
        
//         if (!user) {
//             return res.status(404).json({ 
//                 success: false,
//                 valid: false, 
//                 message: 'User not found' 
//             });
//         }
        
//         res.json({ 
//             success: true,
//             valid: true, 
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 role: user.role,
//                 isVerified: user.isVerified
//             }
//         });
//     } catch (error) {
//         console.error('Verify token error:', error);
//         res.status(500).json({ 
//             success: false,
//             valid: false, 
//             message: error.message 
//         });
//     }
// });

// // Logout
// router.post('/logout', verifyToken, (req, res) => {
//     res.json({ 
//         success: true,
//         message: 'Logged out successfully' 
//     });
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken, isAdmin, isCounter, isAdminOrCounter } = require('../authMiddleware');

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Email and password are required' 
            });
        }

        const userData = await User.findOne({ email });
        
        if (!userData) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }
        
        if (!userData.isVerified) {
            return res.status(401).json({ 
                success: false,
                message: 'Please verify your email before logging in',
                needsVerification: true,
                email: userData.email 
            });
        }
        
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }
        
        // Generate token with role included
        const token = jwt.sign(
            { 
                email: userData.email, 
                userId: userData._id, 
                firstName: userData.firstName, 
                lastName: userData.lastName,
                role: userData.role 
            }, 
            process.env.JWT_SECRET || 'secretKey',
            { expiresIn: process.env.JWT_EXPIRE || '24h' }
        );
        
        const userResponse = {
            id: userData._id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            isVerified: userData.isVerified
        };
        
        res.json({ 
            success: true,
            message: 'Login successful', 
            user: userResponse, 
            token: token 
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Something went wrong', 
            error: error.message 
        });
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, phoneNo, mobileNo, address } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNo: phoneNo || '',
            mobileNo: mobileNo || '',
            address: address || '',
            termCondition: true,
            role: 'customer',
            isVerified: true,
            registeredDate: new Date().toISOString()
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { 
                email: user.email, 
                userId: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                role: user.role 
            }, 
            process.env.JWT_SECRET || 'secretKey',
            { expiresIn: process.env.JWT_EXPIRE || '24h' }
        );

        const userResponse = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isVerified: user.isVerified
        };

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: userResponse,
            token: token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
});

// Get all users (admin only)
router.get('/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password -__v');
        
        res.json({ 
            success: true,
            data: users 
        });
        
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching users', 
            error: error.message 
        });
    }
});

// ADD THIS: Get all counter staff (admin only)
router.get('/counters', verifyToken, isAdmin, async (req, res) => {
    try {
        const counters = await User.find({ role: 'counter' }).select('-password -__v');
        
        res.json({ 
            success: true,
            data: counters 
        });
        
    } catch (error) {
        console.error('Get counters error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching counter staff', 
            error: error.message 
        });
    }
});

// ADD THIS: Create counter staff (admin only)
router.post('/create-counter', verifyToken, isAdmin, async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNo, mobileNo, address } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: firstName, lastName, email, password'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create counter user
        const user = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNo: phoneNo || '',
            mobileNo: mobileNo || '',
            address: address || '',
            termCondition: true,
            role: 'counter', // Set role as counter
            isVerified: true, // Auto-verify for counter staff created by admin
            registeredDate: new Date().toISOString()
        });

        await user.save();

        const userResponse = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isVerified: user.isVerified
        };

        res.status(201).json({
            success: true,
            message: 'Counter staff created successfully',
            user: userResponse
        });

    } catch (error) {
        console.error('Create counter error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during counter staff creation',
            error: error.message
        });
    }
});

// ADD THIS: Counter dashboard endpoint (counter only)
router.get('/counter/dashboard', verifyToken, isCounter, async (req, res) => {
    try {
        res.json({ 
            success: true,
            message: 'Welcome to Counter Dashboard',
            user: {
                id: req.user.userId,
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                role: req.user.role
            }
        });
    } catch (error) {
        console.error('Counter dashboard error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Something went wrong', 
            error: error.message 
        });
    }
});

// ADD THIS: Get counter-specific data (accessible by both admin and counter)
router.get('/counter/orders', verifyToken, isAdminOrCounter, async (req, res) => {
    try {
        // This is a placeholder - you can add your order model logic here
        // For example, if you have an Order model:
        // const orders = await Order.find({ status: 'pending' }).populate('customer');
        
        res.json({ 
            success: true,
            message: 'Counter orders data',
            data: [] // Replace with actual orders data
        });
    } catch (error) {
        console.error('Get counter orders error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching orders', 
            error: error.message 
        });
    }
});

// Get user by email (protected)
router.get('/user', verifyToken, async (req, res) => {
    try {
        const { email } = req.user;
        const userData = await User.findOne({ email }).select('-password -__v');
        
        if (userData) {
            res.json({ 
                success: true,
                data: userData 
            });
        } else {
            res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Something went wrong', 
            error: error.message 
        });
    }
});

// Verify token (protected)
router.get('/verify', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password -__v');
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                valid: false, 
                message: 'User not found' 
            });
        }
        
        res.json({ 
            success: true,
            valid: true, 
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ 
            success: false,
            valid: false, 
            message: error.message 
        });
    }
});

// Logout
router.post('/logout', verifyToken, (req, res) => {
    res.json({ 
        success: true,
        message: 'Logged out successfully' 
    });
});

module.exports = router;