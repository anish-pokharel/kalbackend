




// const express = require('express');
// const app = express();
// const connectDb = require('./db');
// const cors = require('cors');

// // Import routes
// const userRouter = require('./routes/userRoutes');
// const userVerification = require('./routes/userverification');
// const routeRouter = require('./routes/routeRoute'); 
// const fareRouter = require('./routes/fareRoute');
// const busRouter = require('./routes/busRoutes');
// const bookingRouter = require('./routes/bookingRoute');
// const customerRouter = require('./routes/customerRoutes');
// const boardingPointRouter = require('./routes/boardingPointRoutes');
// const paymentRouter = require('./routes/paymentRoutes');

// // Connect to database
// connectDb();

// // ========== IMPROVED CORS CONFIGURATION FOR VERCEL ==========

// // Define allowed origins
// const allowedOrigins = [
//     'http://localhost:4200',
//     'http://localhost:3000',
//     'https://kalikayatat.netlify.app',
//     'https://kalikayatat.netlify.app',
//     'https://kalbackend-pnop.vercel.app'
// ];

// // CORS middleware - MUST come before any routes
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
    
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) {
//         return next();
//     }
    
//     // Check if origin is allowed
//     if (allowedOrigins.includes(origin)) {
//         res.header('Access-Control-Allow-Origin', origin);
//     }
    
//     // Set other CORS headers
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override');
//     res.header('Access-Control-Expose-Headers', 'Authorization, Content-Disposition');
    
//     // Handle preflight OPTIONS request
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
    
//     next();
// });

// // Also use the cors package as backup
// app.use(cors({
//     origin: function(origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl)
//         if (!origin) return callback(null, true);
        
//         if (allowedOrigins.indexOf(origin) === -1) {
//             return callback(null, false);
//         }
//         return callback(null, true);
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
//     optionsSuccessStatus: 200
// }));

// // ========== END OF CORS CONFIGURATION ==========

// // Body parsing middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request logging middleware (for development)
// app.use((req, res, next) => {
//     console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//     console.log('Origin:', req.headers.origin);
//     console.log('CORS Headers set:', res.getHeaders());
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
// app.use('/api', customerRouter);
// app.use('/api', boardingPointRouter);
// app.use('/api/payments', paymentRouter);

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
//         message: `Route ${req.method} ${req.url} not found` 
//     });
// });

// // Export for Vercel serverless function
// const PORT = process.env.PORT || 3000;

// // For local development
// if (process.env.NODE_ENV !== 'production') {
//     app.listen(PORT, () => {
//         console.log(`✅ Server is running on port ${PORT}`);
//         console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
//         console.log(`📝 API URL: http://localhost:${PORT}`);
//         console.log(`🔍 Health check: http://localhost:${PORT}/health`);
//     });
// }

// // Export for Vercel
// module.exports = app;




// const express = require('express');
// const app = express();
// const connectDb = require('./db');
// const cors = require('cors');

// // Import routes
// const userRouter = require('./routes/userRoutes');
// const userVerification = require('./routes/userverification');
// const routeRouter = require('./routes/routeRoute'); 
// const fareRouter = require('./routes/fareRoute');
// const busRouter = require('./routes/busRoutes');
// const bookingRouter = require('./routes/bookingRoute');
// const customerRouter = require('./routes/customerRoutes');
// const boardingPointRouter = require('./routes/boardingPointRoutes');
// const paymentRouter = require('./routes/paymentRoutes');

// // Connect to database
// connectDb();

// // ========== CORS CONFIGURATION ==========
// const allowedOrigins = [
//     'http://localhost:4200',
//     'http://localhost:3000',
//     'https://kalikayatat.netlify.app',
//     'https://kalbackend-pnop.vercel.app'
// ];

// // Manual CORS middleware
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
    
//     if (origin && allowedOrigins.includes(origin)) {
//         res.header('Access-Control-Allow-Origin', origin);
//     }
    
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

// // Express CORS middleware as backup
// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
// }));

// // Body parsing middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request logging
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
// });

// // ========== ROUTE REGISTRATION ==========
// app.use('/api/auth', userRouter);
// app.use('/api/auth', userVerification);
// app.use('/api', routeRouter);
// app.use('/api', fareRouter);
// app.use('/api', busRouter);
// app.use('/api', customerRouter);
// app.use('/api', boardingPointRouter);
// app.use('/api/payments', paymentRouter);
// // app.use('/api/bookings', bookingRouter);  // ← ONLY ONE REGISTRATION
// app.use('/api/bookings', bookingRouter);  // ← This is CORRECT
// // app.use('/api', bookingRouter);  // ← This is WRONG - it's mounting at /api not /api/bookings



// // Redirect for backward compatibility
// app.get('/verify-signup', (req, res) => {
//     const { token } = req.query;
//     if (!token) {
//         return res.status(400).send('No token provided');
//     }
//     res.redirect(`/api/auth/verify-signup?token=${token}`);
// });

// // Test route
// app.get('/', (req, res) => {
//     res.json({ 
//         success: true,
//         message: 'Kalika Backend API is running',
//         version: '1.0.0',
//         timestamp: new Date(),
//         registeredRoutes: {
//             auth: '/api/auth/*',
//             bookings: '/api/bookings/*',
//             routes: '/api/routes/*',
//             buses: '/api/buses/*',
//             fares: '/api/fares/*',
//             customers: '/api/customers/*',
//             payments: '/api/payments/*'
//         }
//     });
// });

// // Health check
// app.get('/health', (req, res) => {
//     res.json({ 
//         status: 'OK', 
//         timestamp: new Date(),
//         uptime: process.uptime(),
//         database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//     });
// });

// // 404 handler - MUST be last
// app.use((req, res) => {
//     console.log(`❌ 404: ${req.method} ${req.url} not found`);
//     res.status(404).json({ 
//         success: false, 
//         message: `Route ${req.method} ${req.url} not found`,
//         availableEndpoints: [
//             'POST /api/auth/login',
//             'POST /api/auth/register',
//             'POST /api/bookings',
//             'GET /api/bookings/my-bookings',
//             'GET /api/bookings/:id',
//             'GET /api/buses/search',
//             'GET /api/routes'
//         ]
//     });
// });

// // Error handler
// app.use((err, req, res, next) => {
//     console.error('❌ Error:', err.stack);
//     res.status(500).json({ 
//         success: false, 
//         message: 'Something went wrong!',
//         error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
//     });
// });

// // For local development
// if (process.env.NODE_ENV !== 'production') {
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//         console.log(`✅ Server running on port ${PORT}`);
//         console.log(`📍 http://localhost:${PORT}`);
//         console.log(`🔍 Health: http://localhost:${PORT}/health`);
//     });
// }

// module.exports = app;



const express = require('express');
const app = express();
const connectDb = require('./db');
const cors = require('cors');
const mongoose = require('mongoose'); // ← ADD THIS IMPORT

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

// ========== CORS CONFIGURATION ==========
const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:3000',
    'https://kalikayatat.netlify.app',
    'https://kalbackend-pnop.vercel.app'
];

// Manual CORS middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Express CORS middleware as backup
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ========== ROUTE REGISTRATION ==========
app.use('/api/auth', userRouter);
app.use('/api/auth', userVerification);
app.use('/api', routeRouter);
app.use('/api', fareRouter);
app.use('/api', busRouter);
app.use('/api', customerRouter);
app.use('/api', boardingPointRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/bookings', bookingRouter);  // ← ONLY ONE REGISTRATION

// Redirect for backward compatibility
app.get('/verify-signup', (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('No token provided');
    }
    res.redirect(`/api/auth/verify-signup?token=${token}`);
});

// Test route
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'Kalika Backend API is running',
        version: '1.0.0',
        timestamp: new Date(),
        registeredRoutes: {
            auth: '/api/auth/*',
            bookings: '/api/bookings/*',
            routes: '/api/routes/*',
            buses: '/api/buses/*',
            fares: '/api/fares/*',
            customers: '/api/customers/*',
            payments: '/api/payments/*'
        }
    });
});

// Health check - FIXED with mongoose check
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection && mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        uptime: process.uptime(),
        database: dbStatus
    });
});

// 404 handler - MUST be last
app.use((req, res) => {
    console.log(`❌ 404: ${req.method} ${req.url} not found`);
    res.status(404).json({ 
        success: false, 
        message: `Route ${req.method} ${req.url} not found`,
        availableEndpoints: [
            'POST /api/auth/login',
            'POST /api/auth/register',
            'POST /api/bookings',
            'GET /api/bookings/my-bookings',
            'GET /api/bookings/:id',
            'GET /api/buses/search',
            'GET /api/routes'
        ]
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`📍 http://localhost:${PORT}`);
        console.log(`🔍 Health: http://localhost:${PORT}/health`);
    });
}

module.exports = app;