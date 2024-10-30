import express from 'express';
import cors from 'cors';
import { 
    login, 
    userdetails, 
    maxleave, 
    avlleave, 
    viewinfoa, 
    viewinfob, 
    viewinfoc, 
    flogout, 
    selsup, 
    addleavereq, 
    fetchleaves, 
    approveleave, 
    getPerformance, 
    workinfo, 
    coninfo, 
    getTotalEmployees, 
    getLeavesTaken, 
    getPendingLeaveAppeals, 
    getAveragePerformance 
} from './controllers/HRcontroller.js';
import { HRrouter } from './routes/HRroute.js';
import employeeRoutes from './routes/employeeRoutes.js';
import db from './utils/db.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Use HR routes
app.use('/auth', HRrouter);

// Use employee routes
app.use('/api/employees', employeeRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello Nesa');
});

//***********************************************************************************************************************
// HR Additional Routes
// Attach routes to HRrouter for modular route handling
HRrouter.post('/login', login);
HRrouter.get('/userprofile/:userId', userdetails);
HRrouter.get('/maxleaves/:userId', maxleave);
HRrouter.get('/avalleaves/:userId', avlleave);
HRrouter.get('/viewinfoa/:ID', viewinfoa);
HRrouter.get('/viewinfob/:ID', viewinfob);
HRrouter.get('/viewinfoc/:ID', viewinfoc);
HRrouter.get('/logout', flogout);
HRrouter.get('/selsupervisor/:EmployeeId', selsup);
HRrouter.post('/addleavereq/:EmployeeId', addleavereq);
HRrouter.get('/leaves/:supID', fetchleaves);
HRrouter.put('/approveleave/:id', approveleave);
HRrouter.get('/performance/:UID', getPerformance);
HRrouter.get('/workinfo/:UID', workinfo);
HRrouter.get('/coninfo', coninfo);
HRrouter.get('/totalEmployees', getTotalEmployees);
HRrouter.get('/leavesTaken', getLeavesTaken);
HRrouter.get('/pendingLeaveAppeals', getPendingLeaveAppeals);
HRrouter.get('/averagePerformance', getAveragePerformance);

//***********************************************************************************************************************
// Endpoint to fetch departments
app.get('/api/departments', (req, res) => {
  const sql = 'SELECT Work_Section FROM Work_Section;';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching departments' });
    }

    const departmentNames = results.map(department => department.Work_Section);
    res.json(departmentNames);
  });
});

// Endpoint to fetch employees by department
app.post('/api/employees/departmentName', (req, res) => {
  const { departments } = req.body;
  const query = 'CALL getEmployeeByDepartment(?)';

  db.query(query, [departments], (error, results) => {
    if (error) {
      console.error('Database query failed:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const employees = results[0];
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

    if (result && result[0]) {
      res.json({ totalLeaves: result[0] });
    } else {
      res.json({ totalLeaves: [] });
    }
  });
});

//***********************************************************************************************************************
// Endpoint to fetch job titles
app.get('/api/jobtitles', (req, res) => {
  const sql = 'SELECT DISTINCT(Job_Title) FROM Professional_Details;';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching job titles' });
    }

    const job_titles = results.map(row => row.Job_Title);
    res.json(job_titles);
  });
});

//**************************************************************************************************************************
// Endpoint to fetch pay grades
app.get('/api/paygrades', (req, res) => {
  const sql = 'SELECT DISTINCT(Pay_Grade) FROM Maximum_Leave_Count;';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error fetching pay grades' });
    }

    const payGrades = results.map(row => row.Pay_Grade);
    res.json(payGrades);
  });
});

//*****************************************************************************************************************************
// Endpoint to filter employees by department, pay grade, and job title
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

//*********************************************************************************************************************
// Endpoint to fetch employee IDs
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

// Endpoint for career progression
app.post('/api/employees/career-progression', async (req, res) => {
  const { Employee_Id } = req.body;
  const query = 'SELECT * FROM getPastDetails WHERE Employee_ID = ?;';

  try {
    const [results] = await db.query(query, [Employee_Id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No employees found for the provided filters.' });
    }

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
