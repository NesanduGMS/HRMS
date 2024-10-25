import express from 'express'; 
const router = express.Router();
import { addEmployeeDetails } from '../controllers/employeeController.js';

// POST route for adding an employee
router.post('/addEmployeeDetails', addEmployeeDetails);

export default router;