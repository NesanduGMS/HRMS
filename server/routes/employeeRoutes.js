import express from 'express'; 
const router = express.Router();
import { addEmployee } from '../controllers/employeeController.js';

// POST route for adding an employee
router.post('/addEmployee', addEmployee);

export default router;
