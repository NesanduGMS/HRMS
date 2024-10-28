import db from '../utils/db.js';
import util from 'util';
import bcrypt from 'bcrypt';

// Promisify the query method of the database connection
const query = util.promisify(db.query).bind(db);


//EmployeeTablePage.jsx:
// Controller to get employee data for a specific employee ID
export const getEmployeeTable = async (req, res) => {
  const { employeeId } = req.params; // Extract employeeId from request parameters

  try {
    // Query to fetch employee data from the database
    const sql = 'SELECT * FROM Employee WHERE Employee_Id = ?'; // Use ? for parameterized query
    const rows = await query(sql, [employeeId]); // Execute the query

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Send the employee data as a response
    res.status(200).json(rows[0]); // Send the first row, as it should be the employee
  } catch (error) {
    console.error('Error fetching employee data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to update employee details
export const updateEmployeeDetails = async (req, res) => {
    const { employeeId } = req.params;
    const employeeUpdates = { ...req.body };
  
    // Check and format dates
    if (employeeUpdates.Recruitment_Date) {
      employeeUpdates.Recruitment_Date = new Date(employeeUpdates.Recruitment_Date).toISOString().split('T')[0];
    }
    if (employeeUpdates.Date_Of_Birth) {
      employeeUpdates.Date_Of_Birth = new Date(employeeUpdates.Date_Of_Birth).toISOString().split('T')[0];
    }
  
    try {
      const sql = 'UPDATE Employee SET ? WHERE Employee_Id = ?';
      await query(sql, [employeeUpdates, employeeId]);
      res.status(200).json({ message: 'Employee personal details updated successfully' });
    } catch (error) {
      console.error('Error updating employee data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//AvailableLeavesTable.jsx:
export const getAvailableLeaves = async (req, res) => {
    const { employeeId } = req.params;
  
    try {
      const sql = 'SELECT * FROM Available_Leaves WHERE Employee_Id = ?';
      const rows = await query(sql, [employeeId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Available leave data not found for this employee' });
      }
  
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error fetching available leaves data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Controller to update available leaves for a specific employee
export const updateAvailableLeaves = async (req, res) => {
  const { employeeId } = req.params;
  const leaveUpdates = { ...req.body };

  try {
    const sql = 'UPDATE Available_Leaves SET ? WHERE Employee_Id = ?';
    await query(sql, [leaveUpdates, employeeId]);

    res.status(200).json({ message: 'Available leaves updated successfully' });
  } catch (error) {
    console.error('Error updating available leaves data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//ProfessionalDetailsTable.jsx:
export const getProfessionalDetails = async (req, res) => {
    const { employeeId } = req.params;

    try {
    const sql = 'SELECT * FROM Professional_Details WHERE Employee_Id = ?';
    const rows = await query(sql, [employeeId]);

    if (rows.length === 0) {
        return res.status(404).json({ message: 'Professional details not found for this employee' });
    }

    res.status(200).json(rows[0]);
    } catch (error) {
    console.error('Error fetching professional details:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProfessionalDetails = async (req, res) => {
    const { employeeId } = req.params;
    const professionalUpdates = { ...req.body };
  
    try {
      const sql = 'UPDATE Professional_Details SET ? WHERE Employee_Id = ?';
      await query(sql, [professionalUpdates, employeeId]);
  
      res.status(200).json({ message: 'Professional details updated successfully' });
    } catch (error) {
      console.error('Error updating professional details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//EmployeeContactInfoTable.jsx:
export const getEmployeeContactInfo = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const sql = 'SELECT * FROM Employee_Contact_Info WHERE Employee_Id = ?';
    const rows = await query(sql, [employeeId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee contact information not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching employee contact information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to delete employee contact information
export const deleteEmployeeContactInfo = async (req, res) => {
  const { employeeId, mobileNumber } = req.params;

  try {
    const sql = 'DELETE FROM Employee_Contact_Info WHERE Employee_Id = ? AND Employee_Mobile_Number = ?';
    await query(sql, [employeeId, mobileNumber]);

    res.status(200).json({ message: 'Employee contact information deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee contact information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to add employee contact information
export const addEmployeeContactInfo = async (req, res) => {
  const { employeeId, mobileNumber } = req.body;

  try {
    const sql = 'INSERT INTO Employee_Contact_Info (Employee_Id, Employee_Mobile_Number) VALUES (?, ?)';
    await query(sql, [employeeId, mobileNumber]);

    res.status(201).json({ Employee_Id: employeeId, Employee_Mobile_Number: mobileNumber });
  } catch (error) {
    console.error('Error adding employee contact information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// EmergencyInformationTable.jsx:
export const getEmergencyInfo = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const sql = 'SELECT * FROM Emergency_Information WHERE Employee_Id = ?';
    const rows = await query(sql, [employeeId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Emergency information not found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching emergency information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addEmergencyInfo = async (req, res) => {
  const { employeeId, mobileNumber, name, address } = req.body;

  try {
    const sql = 'INSERT INTO Emergency_Information (Employee_Id, Dependant_Mobile_Number, Dependant_Name, Dependant_Address) VALUES (?, ?, ?, ?)';
    await query(sql, [employeeId, mobileNumber, name, address]);

    res.status(201).json({ Employee_Id: employeeId, Dependant_Mobile_Number: mobileNumber, Dependant_Name: name, Dependant_Address: address });
  } catch (error) {
    console.error('Error adding emergency information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEmergencyInfo = async (req, res) => {
  const { mobileNumber, employeeId } = req.params;

  try {
    const sql = 'DELETE FROM Emergency_Information WHERE Employee_Id = ? AND Dependant_Mobile_Number = ?';
    await query(sql, [employeeId, mobileNumber]);

    res.status(200).json({ message: 'Emergency information deleted successfully' });
  } catch (error) {
    console.error('Error deleting emergency information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get user accounts for a specific employee ID
export const getUserAccounts = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const sql = 'SELECT * FROM User_Account WHERE Employee_Id = ?';
    const rows = await query(sql, [employeeId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User accounts not found for this employee' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to add a user account
export const addUserAccount = async (req, res) => {
  const { userId, employeeId, password, role } = req.body;

  try {
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for hashing

    // SQL query to insert user data with the hashed password
    const sql = 'INSERT INTO User_Account (User_Id, Employee_Id, User_Password, Role) VALUES (?, ?, ?, ?)';
    await query(sql, [userId, employeeId, hashedPassword, role]);

    res.status(201).json({ User_Id: userId, Employee_Id: employeeId, Role: role });
  } catch (error) {
    console.error('Error adding user account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to delete a user account
export const deleteUserAccount = async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = 'DELETE FROM User_Account WHERE User_Id = ?';
    await query(sql, [userId]);

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
