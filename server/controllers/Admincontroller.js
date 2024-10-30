
import db from '../utils/db.js';

export const makehr = (req, res) => {
  const employeeId = req.params.employeeId; // Get employee ID from request parameters
  const sql = "UPDATE User_Account SET Role = 'HR_Manager' WHERE Employee_Id = ?";

  // Check if EmployeeId is provided
  if (!employeeId) {
    return res.status(400).json({ Status: false, Error: 'Employee ID is required' });
  }

  db.query(sql, [employeeId], (err, result) => {
    if (err) return res.status(500).json({ Status: false, Error: 'Query error', Details: err });

    // Check if any row was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: false, Error: 'Employee not found' });
    }

    return res.json({ Status: true, Message: 'HR Manager appointed successfully' });
  });
};



export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM ADMIN WHERE Admin_mail = ? AND APassword = ?';

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ Status: false, Error: 'Query error' });

    if (result.length === 0) {
      return res.status(404).json({ Status: false, Error: 'Invalid email or password' });
    }

    return res.json({ Status: true, Message: 'Login successful', Result: result[0] });
  });
}

export const viweadd = (req, res) => {
  const sql = 'SELECT * FROM Adminview ';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ Status: false, Error: 'Query error' });
    return res.json({ Status: true, Result: result });
  });
}