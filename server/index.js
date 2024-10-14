const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to the correct port of your React app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true // Enable credentials if necessary
}));

app.use(express.json());
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
