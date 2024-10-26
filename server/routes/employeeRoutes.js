import express from 'express'; 
const router = express.Router();
import { addEmployeeDetails } from '../controllers/employeeController.js';
import { getEmployeeTable, updateEmployeeDetails, getAvailableLeaves, updateAvailableLeaves, getProfessionalDetails, updateProfessionalDetails, getEmployeeContactInfo, deleteEmployeeContactInfo, addEmployeeContactInfo, getEmergencyInfo, addEmergencyInfo, deleteEmergencyInfo, getUserAccounts, addUserAccount, deleteUserAccount } from '../controllers/EditViewEmployeeController.js';

// POST route for adding an employee
router.post('/addEmployeeDetails', addEmployeeDetails);

router.get('/getEmployeeTable/:employeeId', getEmployeeTable);
router.put('/updateEmployee/:employeeId', updateEmployeeDetails);

router.get('/getAvailableLeaves/:employeeId', getAvailableLeaves);
router.put('/updateAvailableLeaves/:employeeId', updateAvailableLeaves);

router.get('/getProfessionalDetails/:employeeId', getProfessionalDetails);
router.put('/updateProfessionalDetails/:employeeId', updateProfessionalDetails);

// GET route for fetching employee contact information
router.get('/getEmployeeContactInfo/:employeeId', getEmployeeContactInfo);

// DELETE route for deleting employee contact information
router.delete('/deleteEmployeeContactInfo/:employeeId/:mobileNumber', deleteEmployeeContactInfo);

// POST route for adding employee contact information
router.post('/addEmployeeContactInfo', addEmployeeContactInfo);

// Emergency information routes
router.get('/getEmergencyInfo/:employeeId', getEmergencyInfo); // Ensure employeeId is included in the route
router.post('/addEmergencyInfo', addEmergencyInfo);
router.delete('/deleteEmergencyInfo/:mobileNumber/:employeeId', deleteEmergencyInfo);

// User account routes
router.get('/user-accounts/:employeeId', getUserAccounts); // Route to get user accounts for a specific employee
router.post('/user-accounts', addUserAccount); // Route to add a user account
router.delete('/user-accounts/:userId', deleteUserAccount); // Route to delete a user account

export default router;