import db from '../utils/db.js';

// Controller for adding a new employee
export const addEmployee = (req, res) => {
    console.log(req.body);
    const {
        Employee_Id,
        First_Name,
        Last_Name,
        Full_Name,
        Recruitment_Date,
        Date_Of_Birth,
        Gender,
        Marital_Status,
        Personal_Email,
        Country,
        Address
    } = req.body;

    const sql = `
        INSERT INTO Employee 
        (Employee_Id, First_Name, Last_Name, Full_Name, Recruitment_Date, Date_Of_Birth, Gender, Marital_Status, Personal_Email, Country, Address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            Employee_Id,
            First_Name, 
            Last_Name, 
            Full_Name, 
            Recruitment_Date, 
            Date_Of_Birth, 
            Gender, 
            Marital_Status, 
            Personal_Email, 
            Country, 
            Address
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error', error: err.message });
            }
            res.status(200).json({ success: true, message: 'Employee added successfully' });
        }
    );
};
