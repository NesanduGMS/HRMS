const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express(); // Define the app instance at the top

const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to the correct port of your React app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true // Enable credentials if necessary
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Define your routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/reports', reportRoutes); // Report routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
