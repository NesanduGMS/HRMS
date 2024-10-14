const mysql = require('mysql2');
require('dotenv').config(); // Ensure you are loading your environment variables

const connection = mysql.createPool({
    host: "db-mysql-nyc3-03427-do-user-17948696-0.l.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_2wkHuRrvaIqCM21kN2q", // Replace with your MySQL password
    database: "defaultdb",
    port: 25060
});
  

// Test the connection
connection.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed:', err);
      return;
    }
    console.log('Connected to database.');
    connection.release(); // release the connection back to the pool
  });
  
  module.exports = connection;
