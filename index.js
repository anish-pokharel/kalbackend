
// // Add to index.js after other route imports
// // const bookingRouter = require('./routes/bookingRoutes');

// const express = require('express');
// const app = express();
// const connectDb = require('./db');
// const cors = require('cors');
// const userRouter = require('./routes/userRoutes');
// const userVerification = require('./routes/userverification');
// const routeRouter = require('./routes/routeRoute'); 
// const fareRouter = require('./routes/fareRoute');
// const busRouter = require('./routes/busRoutes');
// const bookingRouter = require('./routes/bookingRoute');
// const customerRouter = require('./routes/customerRoutes'); // Add customer routes
// const boardingPointRouter = require('./routes/boardingPointRoutes'); // Add boarding point routes
// const paymentRouter = require('./routes/paymentRoutes'); // Add payment routes

// // Connect to database
// connectDb();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS configuration
// app.use(cors({
//     // origin: 'http://localhost:4200',

//         origin: [
//         'http://localhost:4200',
//         'https://kalikayatayat.netlify.app',
//     ],

//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Request logging middleware (for development)
// app.use((req, res, next) => {
//     console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//     next();
// });

// // Redirect for backward compatibility
// app.get('/verify-signup', (req, res) => {
//     const { token } = req.query;
//     if (!token) {
//         return res.status(400).send('No token provided');
//     }
//     console.log('Redirecting verification to API route');
//     res.redirect(`/api/auth/verify-signup?token=${token}`);
// });

// // Routes
// app.use('/api/auth', userRouter);
// app.use('/api/auth', userVerification);
// app.use('/api', routeRouter);
// app.use('/api', fareRouter);
// app.use('/api', busRouter);
// app.use('/api', bookingRouter);
// app.use('/api', customerRouter); // Register customer routes
// app.use('/api', boardingPointRouter); // Register boarding point routes
// app.use('/api/payments', paymentRouter); // Register payment routes
// app.use('/api/bookings', bookingRouter);
// app.use('/api/bookings', bookingRouter);  // This line ensures both paths work



// // Test route
// app.get('/', (req, res) => {
//     res.json({ 
//         message: 'API is running',
//         version: '1.0.0',
//         timestamp: new Date(),
//         endpoints: {
//             auth: ['/api/auth/login', '/api/auth/register', '/api/auth/verify'],
//             routes: ['/api/routes', '/api/routes/:id', '/api/routes/:id/stops'],
//             fares: ['/api/fares', '/api/fares/:id'],
//             buses: ['/api/buses/search', '/api/buses/public/:id', '/api/buses/:id/boarding-points'],
//             bookings: ['/api/bookings', '/api/bookings/my-bookings', '/api/bookings/:id'],
//             customers: ['/api/customers', '/api/customers/stats', '/api/customers/cities', '/api/customers/:id']
//         }
//     });
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.json({ 
//         status: 'OK', 
//         timestamp: new Date(),
//         uptime: process.uptime(),
//         memory: process.memoryUsage()
//     });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error('Error:', err.stack);
//     res.status(500).json({ 
//         success: false,
//         message: 'Something went wrong!',
//         error: process.env.NODE_ENV === 'development' ? err.message : {}
//     });
// });

// // 404 handler
// app.use((req, res) => {
//     res.status(404).json({ 
//         success: false,
//         message: 'Route not found' 
//     });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`✅ Server is running on port ${PORT}`);
//     console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
//     console.log(`📝 API URL: http://localhost:${PORT}`);
//     console.log(`🔍 Health check: http://localhost:${PORT}/health`);
// });






// index.js - Complete file with proper CORS for Vercel

const express = require('express');
const app = express();
const connectDb = require('./db');
const cors = require('cors');

// Import routes
const userRouter = require('./routes/userRoutes');
const userVerification = require('./routes/userverification');
const routeRouter = require('./routes/routeRoute'); 
const fareRouter = require('./routes/fareRoute');
const busRouter = require('./routes/busRoutes');
const bookingRouter = require('./routes/bookingRoute');
const customerRouter = require('./routes/customerRoutes');
const boardingPointRouter = require('./routes/boardingPointRoutes');
const paymentRouter = require('./routes/paymentRoutes');

// Connect to database
connectDb();

// ========== IMPROVED CORS CONFIGURATION FOR VERCEL ==========

// Define allowed origins
const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:3000',
    'https://kalikayatat.netlify.app',
    'https://kalikayatat.netlify.app',
    'https://kalbackend-pnop.vercel.app'
];

// CORS middleware - MUST come before any routes
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
        return next();
    }
    
    // Check if origin is allowed
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    // Set other CORS headers
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override');
    res.header('Access-Control-Expose-Headers', 'Authorization, Content-Disposition');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

// Also use the cors package as backup
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(null, false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200
}));

// ========== END OF CORS CONFIGURATION ==========

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for development)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Origin:', req.headers.origin);
    console.log('CORS Headers set:', res.getHeaders());
    next();
});

// Redirect for backward compatibility
app.get('/verify-signup', (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('No token provided');
    }
    console.log('Redirecting verification to API route');
    res.redirect(`/api/auth/verify-signup?token=${token}`);
});

// Routes
app.use('/api/auth', userRouter);
app.use('/api/auth', userVerification);
app.use('/api', routeRouter);
app.use('/api', fareRouter);
app.use('/api', busRouter);
app.use('/api', bookingRouter);
app.use('/api', customerRouter);
app.use('/api', boardingPointRouter);
app.use('/api/payments', paymentRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'API is running',
        version: '1.0.0',
        timestamp: new Date(),
        endpoints: {
            auth: ['/api/auth/login', '/api/auth/register', '/api/auth/verify'],
            routes: ['/api/routes', '/api/routes/:id', '/api/routes/:id/stops'],
            fares: ['/api/fares', '/api/fares/:id'],
            buses: ['/api/buses/search', '/api/buses/public/:id', '/api/buses/:id/boarding-points'],
            bookings: ['/api/bookings', '/api/bookings/my-bookings', '/api/bookings/:id'],
            customers: ['/api/customers', '/api/customers/stats', '/api/customers/cities', '/api/customers/:id']
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: `Route ${req.method} ${req.url} not found` 
    });
});

// Export for Vercel serverless function
const PORT = process.env.PORT || 3000;

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`📝 API URL: http://localhost:${PORT}`);
        console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    });
}

// Export for Vercel
module.exports = app;