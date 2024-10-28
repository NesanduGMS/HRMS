import mysql from 'mysql2';
import { promisify } from 'util';

// Create a connection pool to the database

const db = mysql.createPool({
    host: "db-mysql-nyc3-03427-do-user-17948696-0.l.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_2wkHuRrvaIqCM21kN2q", // Replace with your MySQL password
    database: "defaultdb",
    port: 25060
  });
  
  
  // Ensure MySQL connection works
  db.getConnection((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to MySQL');
    }
  });

db.query = promisify(db.query);
export default db;
