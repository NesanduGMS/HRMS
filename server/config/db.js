// db.js or similar
const mysql = require('mysql2/promise'); // Ensure you're using promise-based mysql2
require('dotenv').config(); // If you're using environment variables

// Create a connection to the database
const db = mysql.createPool({
    host: "db-mysql-nyc3-03427-do-user-17948696-0.l.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_2wkHuRrvaIqCM21kN2q", // Replace with your MySQL password
    database: "defaultdb",
    port: 25060
});

// Log the connection to verify it's valid
db.getConnection()
    .then(connection => {
        console.log("Database connected successfully: ", connection); // Log connection
        connection.release(); // Release connection if you just want to verify it
    })
    .catch(error => {
        console.error("Database connection failed: ", error); // Log connection error
    });

module.exports = db; // Export the db pool
