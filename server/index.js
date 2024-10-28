import express from 'express';
import cors from 'cors';
import { HRrouter } from './routes/HRroute.js';
import db from './utils/db.js'; // Import the database connection

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],  // Allow requests from the React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow credentials (e.g., cookies, authentication)
}));

app.use(express.json()); // Parse incoming JSON requests

// Test route
app.get('/', (req, res) => {
  res.send('Hello Nesa');
});

// HR routes
app.use('/auth', HRrouter);

//***********************************************************************************************************************
app.get('/api/departments', (req, res) => {
  const sql = 'SELECT Work_Section FROM Work_Section;';  // Query to fetch department names

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching departments' });
    }

    // Extract department names (Work_Section)
    const departmentNames = results.map(department => department.Work_Section);
    res.json(departmentNames); // Respond with department names
  });
});

app.post('/api/employees/departmentName', (req, res) => {
  const { departments } = req.body;  // Corrected to use req.body
  console.log(departments); // Log the selected department
  const query = 'CALL getEmployeeByDepartment(?)';

  db.query(query, [departments], (error, results) => {
    if (error) {
      console.error('Database query failed:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const employees = results[0];  // Extract employee data from results

    if (employees.length > 0) {
      res.json(employees);
    } else {
      res.status(404).json({ message: `No employees found in department: ${departments}` });
    }
  });
});

//***********************************************************************************************************************
// Endpoint to fetch total leaves based on department and date range
app.post('/api/leaves', (req, res) => {
  const { department, startDate, endDate } = req.body;
  const query = 'CALL getTotalLeaves(?, ?, ?);';

  db.query(query, [department, startDate, endDate], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error fetching total leaves' });
    }
    

    // Send only the actual data (usually in the first element of the result array)
    if (result && result[0]) {
      res.json({ totalLeaves: result[0] });
    } else {
      res.json({ totalLeaves: [] });
    }
  });
});

//***********************************************************************************************************************

app.get('/api/jobtitles', (req, res) => {
  const sql = 'SELECT DISTINCT(Job_Title) FROM Professional_Details;';  // Query to fetch job titles

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching job titles' });
    }

    // Extract job titles (Job_Title)
    const job_titles = results.map(row => row.Job_Title);
    res.json(job_titles); 
  });
});

//**************************************************************************************************************************
app.get('/api/paygrades', (req, res) => {
  const sql = 'SELECT DISTINCT(Pay_Grade) FROM Maximum_Leave_Count;';  // Query to fetch distinct pay grades

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching pay grades' });
    }

    // Extract pay grades
    const payGrades = results.map(row => row.Pay_Grade);
    res.json(payGrades); 
  });
});

//*****************************************************************************************************************************

app.post('/api/employees/filter', async (req, res) => {
  const { department, payGrade, jobTitle } = req.body.params;
  
  const query = 'CALL GetEmployees(?, ?, ?);';
  
  try {
    const [results] = await db.query(query, [department || null, payGrade || null, jobTitle || null]);
    
    if (results[0].length === 0) {
      return res.status(404).json({ message: 'No employees found for the provided filters.' });
    }
    
    res.json(results);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});
//********************************************************************************************************************* */
app.get('/api/ids', (req, res) => {
  const sql = 'SELECT Employee_Id FROM getEmployee ORDER BY Employee_Id ASC;'; 

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching employee IDs' });
    }

    const employees = results.map(row => row.Employee_Id);
    res.json(employees); 
  });
});


app.post('/api/employees/career-progression', async (req, res) => {
  const {Employee_Id} = req.body;
  console.log(Employee_Id);
  const query = 'SELECT * FROM getPastDetails WHERE Employee_ID = ?;';
  
  try {
    const [results] = await db.query(query, [Employee_Id]);
    
    if (results.length === 0) {  // Check if results are empty
      return res.status(404).json({ message: 'No employees found for the provided filters.' });
    }
    
    console.log(results);
    res.json([results]);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});



// Start the server
app.listen(3005, () => {
  console.log('Server is running on port 3005');
});
